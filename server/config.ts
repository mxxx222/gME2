export type ServerConfig = {
  databaseUrl: string
  host: string
  port: number
  logLevel: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent'
}

const logLevels: ReadonlySet<string> = new Set([
  'fatal',
  'error',
  'warn',
  'info',
  'debug',
  'trace',
  'silent',
])

function isLogLevel(value: string): value is ServerConfig['logLevel'] {
  return logLevels.has(value)
}

export function loadServerConfig(env: NodeJS.ProcessEnv = process.env): ServerConfig {
  const databaseUrl = env.DATABASE_URL?.trim()
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required.')
  }

  let parsedDatabaseUrl: URL
  try {
    parsedDatabaseUrl = new URL(databaseUrl)
  } catch {
    throw new Error('DATABASE_URL must be a valid PostgreSQL connection URL.')
  }
  if (!['postgres:', 'postgresql:'].includes(parsedDatabaseUrl.protocol) || !parsedDatabaseUrl.hostname) {
    throw new Error('DATABASE_URL must be a valid PostgreSQL connection URL.')
  }

  const portValue = env.PORT ?? '3001'
  const port = Number(portValue)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.')
  }

  const host = env.HOST?.trim() || '127.0.0.1'
  const logLevelValue = env.LOG_LEVEL ?? 'info'
  if (!isLogLevel(logLevelValue)) {
    throw new Error('LOG_LEVEL is not supported.')
  }

  return {
    databaseUrl,
    host,
    port,
    logLevel: logLevelValue,
  }
}
