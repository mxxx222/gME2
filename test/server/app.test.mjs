import assert from 'node:assert/strict'
import { Writable } from 'node:stream'
import test from 'node:test'
import { createApi } from '../../server/app.ts'

function createLogSink() {
  let output = ''
  const stream = new Writable({
    write(chunk, _encoding, callback) {
      output += chunk.toString()
      callback()
    },
  })
  return { stream, read: () => output }
}

test('liveness does not depend on PostgreSQL', async (t) => {
  const app = createApi({
    config: { logLevel: 'silent' },
    database: { query: async () => { throw new Error('db secret') } },
  })
  t.after(() => app.close())

  const response = await app.inject({ method: 'GET', url: '/api/health/live' })
  assert.equal(response.statusCode, 200)
  assert.ok(response.headers['x-request-id'])
  assert.deepEqual(response.json(), { status: 'ok' })
})

test('readiness reports unavailable without exposing database errors', async (t) => {
  const app = createApi({
    config: { logLevel: 'silent' },
    database: { query: async () => { throw new Error('postgres://private:credential@host/db') } },
  })
  t.after(() => app.close())

  const response = await app.inject({ method: 'GET', url: '/api/health/ready' })
  assert.equal(response.statusCode, 503)
  assert.deepEqual(response.json(), { status: 'unavailable' })
  assert.equal(response.body.includes('credential'), false)
})

test('rejects unexpected query parameters and returns a stable safe error', async (t) => {
  const app = createApi({
    config: { logLevel: 'silent' },
    database: { query: async () => undefined },
  })
  t.after(() => app.close())

  const response = await app.inject({ method: 'GET', url: '/api/health/live?token=private' })
  assert.equal(response.statusCode, 400)
  assert.deepEqual(Object.keys(response.json()).sort(), ['error', 'requestId'])
  assert.deepEqual(response.json().error, {
    code: 'invalid_request',
    message: 'The request is invalid.',
  })
  assert.equal(response.body.includes('private'), false)
})

test('bounds request bodies and returns a safe payload error', async (t) => {
  const app = createApi({
    config: { logLevel: 'silent' },
    database: { query: async () => undefined },
  })
  app.post('/api/test', {
    schema: { body: { type: 'object', additionalProperties: false } },
  }, async () => ({ status: 'ok' }))
  t.after(() => app.close())

  const response = await app.inject({
    method: 'POST',
    url: '/api/test',
    headers: { 'content-type': 'application/json' },
    payload: JSON.stringify('x'.repeat(17 * 1024)),
  })
  assert.equal(response.statusCode, 413)
  assert.equal(response.json().error.code, 'payload_too_large')
})

test('returns a safe error for unsupported media types', async (t) => {
  const app = createApi({
    config: { logLevel: 'silent' },
    database: { query: async () => undefined },
  })
  app.post('/api/test', {
    schema: { body: { type: 'object', additionalProperties: false } },
  }, async () => ({ status: 'ok' }))
  t.after(() => app.close())

  const response = await app.inject({
    method: 'POST',
    url: '/api/test',
    headers: { 'content-type': 'application/x-unknown' },
    payload: 'not json',
  })
  assert.equal(response.statusCode, 415)
  assert.equal(response.json().error.code, 'unsupported_media_type')
})

test('logs omit query strings, authorization values, and error messages', async (t) => {
  const sink = createLogSink()
  const app = createApi({
    config: { logLevel: 'info' },
    database: { query: async () => undefined },
    loggerStream: sink.stream,
  })
  t.after(() => app.close())

  await app.inject({
    method: 'GET',
    url: '/api/health/live?token=query-secret',
    headers: { authorization: 'Bearer header-secret' },
  })
  app.log.error({ err: new Error('error-secret') }, 'test error')

  const output = sink.read()
  assert.equal(output.includes('query-secret'), false)
  assert.equal(output.includes('header-secret'), false)
  assert.equal(output.includes('error-secret'), false)
  assert.equal(output.includes('/api/health/live'), true)
})
