import { randomUUID } from 'node:crypto'
import type { Writable } from 'node:stream'
import Fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify'
import type { FastifyError } from 'fastify'
import type { ServerConfig } from './config.ts'

type Database = {
  query: (query: string) => Promise<unknown>
}

type ApiOptions = {
  config: Pick<ServerConfig, 'logLevel'>
  database: Database
  loggerStream?: Writable
}

const healthResponseSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['status'],
  properties: {
    status: { type: 'string', enum: ['ok', 'ready', 'unavailable'] },
  },
} as const

const emptyQuerySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {},
} as const

function createLoggerOptions(
  logLevel: ServerConfig['logLevel'],
  stream?: Writable,
): FastifyServerOptions['logger'] {
  return {
    level: logLevel,
    redact: {
      paths: ['req.headers.authorization', 'req.headers.cookie', 'req.headers.x-api-key', 'err.message', 'err.stack'],
      censor: '[REDACTED]',
    },
    serializers: {
      req(request) {
        return {
          id: request.id,
          method: request.method,
          url: request.url.split('?')[0],
        }
      },
      err(error) {
        return { type: error.name, message: '[REDACTED]', stack: '[REDACTED]' }
      },
    },
    ...(stream ? { stream } : {}),
  }
}

function errorResponse(requestId: string, code: string, message: string) {
  return { error: { code, message }, requestId }
}

export function createApi(options: ApiOptions): FastifyInstance {
  const app = Fastify({
    bodyLimit: 16 * 1024,
    genReqId: () => randomUUID(),
    requestIdHeader: false,
    trustProxy: false,
    logger: createLoggerOptions(options.config.logLevel, options.loggerStream),
    ajv: {
      customOptions: {
        removeAdditional: false,
        useDefaults: false,
        coerceTypes: false,
        allErrors: false,
      },
    },
  })

  app.addHook('onSend', async (request, reply, payload) => {
    reply.header('x-request-id', request.id)
    return payload
  })

  app.get('/api/health/live', {
    schema: {
      querystring: emptyQuerySchema,
      response: { 200: healthResponseSchema },
    },
  }, async () => ({ status: 'ok' }))

  app.get('/api/health/ready', {
    schema: {
      querystring: emptyQuerySchema,
      response: {
        200: healthResponseSchema,
        503: healthResponseSchema,
      },
    },
  }, async (request, reply) => {
    try {
      await options.database.query('SELECT 1')
      return { status: 'ready' }
    } catch {
      request.log.warn({ requestId: request.id }, 'database readiness check failed')
      return reply.code(503).send({ status: 'unavailable' })
    }
  })

  app.setNotFoundHandler((request, reply) => {
    return reply.code(404).send(errorResponse(request.id, 'not_found', 'The requested resource was not found.'))
  })

  app.setErrorHandler((error: FastifyError, request, reply) => {
    if (error.statusCode === 413) {
      return reply.code(413).send(errorResponse(request.id, 'payload_too_large', 'The request payload is too large.'))
    }
    if (error.statusCode === 415) {
      return reply.code(415).send(errorResponse(request.id, 'unsupported_media_type', 'The request media type is not supported.'))
    }
    if (error.validation || error.statusCode === 400) {
      return reply.code(400).send(errorResponse(request.id, 'invalid_request', 'The request is invalid.'))
    }
    if (error.statusCode && error.statusCode < 500) {
      return reply.code(error.statusCode).send(errorResponse(request.id, 'invalid_request', 'The request could not be completed.'))
    }
    request.log.error({ requestId: request.id, statusCode: error.statusCode ?? 500 }, 'request failed')
    return reply.code(500).send(errorResponse(request.id, 'internal_error', 'The request could not be completed.'))
  })

  return app
}
