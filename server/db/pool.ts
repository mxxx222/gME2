import pg from 'pg'
import type { ServerConfig } from '../config.ts'

export function createDatabasePool(config: Pick<ServerConfig, 'databaseUrl'>) {
  const pool = new pg.Pool({
    connectionString: config.databaseUrl,
    max: 5,
    connectionTimeoutMillis: 3_000,
    idleTimeoutMillis: 30_000,
    statement_timeout: 5_000,
    allowExitOnIdle: true,
  })

  pool.on('error', () => {
    process.stderr.write(`${JSON.stringify({
      level: 'error',
      event: 'database_pool_error',
      message: 'An idle PostgreSQL connection reported an error.',
    })}\n`)
  })

  return pool
}
