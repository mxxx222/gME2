import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { Client, Pool } from 'pg'
import { runner } from 'node-pg-migrate'
import test from 'node:test'
import { createApi } from '../../server/app.ts'

const migrationDirectory = new URL('../../server/db/migrations', import.meta.url).pathname
const rawTestDatabaseUrl = process.env.TEST_DATABASE_URL

function getLocalTestDatabaseUrl() {
  assert.ok(
    rawTestDatabaseUrl,
    'Prerequisite missing: set TEST_DATABASE_URL to the dedicated local gme2_test PostgreSQL database.',
  )
  let parsed
  try {
    parsed = new URL(rawTestDatabaseUrl)
  } catch {
    assert.fail('Prerequisite invalid: TEST_DATABASE_URL must be a valid local PostgreSQL URL.')
  }
  assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname), 'Prerequisite invalid: TEST_DATABASE_URL must target loopback only.')
  assert.equal(parsed.pathname, '/gme2_test', 'Prerequisite invalid: TEST_DATABASE_URL must target the dedicated gme2_test database.')
  assert.ok(['postgres:', 'postgresql:'].includes(parsed.protocol), 'Prerequisite invalid: TEST_DATABASE_URL must use PostgreSQL.')
  return parsed
}

test('applies migrations to a fresh temporary PostgreSQL database and closes connections', async () => {
  const testDatabaseUrl = getLocalTestDatabaseUrl()
  const adminClient = new Client({ connectionString: testDatabaseUrl.toString(), connectionTimeoutMillis: 3_000 })
  try {
    await adminClient.connect()
  } catch {
    assert.fail('Local PostgreSQL is unavailable. Start the isolated gME2 database with `docker compose -p gme2-local-backend up -d postgres`.')
  }

  const temporaryDatabase = `gme2_migration_test_${process.pid}_${randomUUID().replaceAll('-', '')}`
  let databaseCreated = false
  let pool
  let app
  try {
    await adminClient.query(`CREATE DATABASE "${temporaryDatabase}"`)
    databaseCreated = true

    const databaseUrl = new URL(testDatabaseUrl)
    databaseUrl.pathname = `/${temporaryDatabase}`
    await runner({
      databaseUrl: databaseUrl.toString(),
      dir: migrationDirectory,
      direction: 'up',
      migrationsTable: 'gme2_migrations',
      migrationsSchema: 'public',
      migrationLoaderStrategies: [{ extensions: ['.sql'], loader: 'sql' }],
      log: () => undefined,
    })

    pool = new Pool({ connectionString: databaseUrl.toString(), max: 1 })
    const result = await pool.query(
      "SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'app'",
    )
    assert.equal(result.rowCount, 1)
    const appliedMigrations = await pool.query('SELECT name FROM public.gme2_migrations')
    assert.deepEqual(appliedMigrations.rows.map((row) => row.name), ['001_create_app_schema'])

    app = createApi({ config: { logLevel: 'silent' }, database: pool })
    const ready = await app.inject({ method: 'GET', url: '/api/health/ready' })
    assert.equal(ready.statusCode, 200)
    assert.deepEqual(ready.json(), { status: 'ready' })
  } finally {
    if (app) await app.close()
    if (pool) {
      await pool.end()
      await assert.rejects(pool.query('SELECT 1'))
    }
    if (databaseCreated) {
      await adminClient.query(
        'SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1',
        [temporaryDatabase],
      )
      await adminClient.query(`DROP DATABASE "${temporaryDatabase}"`)
    }
    await adminClient.end()
  }
})
