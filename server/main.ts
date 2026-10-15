import { createApi } from './app.ts'
import { loadServerConfig } from './config.ts'
import { createDatabasePool } from './db/pool.ts'

async function main() {
  const config = loadServerConfig()
  const database = createDatabasePool(config)
  const app = createApi({ config, database })

  try {
    await app.listen({ host: config.host, port: config.port })
  } catch {
    try {
      await app.close()
    } finally {
      await database.end()
    }
    throw new Error('API server failed to start.')
  }

  let shutdownStarted = false
  const shutdown = async (signal: NodeJS.Signals) => {
    if (shutdownStarted) return
    shutdownStarted = true
    app.log.info({ signal }, 'shutting down')
    try {
      await app.close()
    } finally {
      await database.end()
    }
  }

  const handleShutdown = (signal: NodeJS.Signals) => {
    shutdown(signal).catch(() => {
      process.stderr.write(`${JSON.stringify({
        level: 'error',
        event: 'shutdown_failed',
        message: 'API server shutdown did not complete cleanly.',
      })}\n`)
      process.exitCode = 1
    })
  }

  process.once('SIGINT', () => handleShutdown('SIGINT'))
  process.once('SIGTERM', () => handleShutdown('SIGTERM'))
}

main().catch(() => {
  process.stderr.write(`${JSON.stringify({
    level: 'error',
    event: 'startup_failed',
    message: 'API server failed to start; check configuration and local database availability.',
  })}\n`)
  process.exitCode = 1
})
