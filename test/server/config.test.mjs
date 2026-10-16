import assert from 'node:assert/strict'
import test from 'node:test'
import { loadServerConfig } from '../../server/config.ts'

const validEnv = {
  DATABASE_URL: 'postgres://gme2_local:local-only@127.0.0.1:54329/gme2_dev',
}

test('loads validated server-only configuration', () => {
  assert.deepEqual(loadServerConfig(validEnv), {
    databaseUrl: validEnv.DATABASE_URL,
    host: '127.0.0.1',
    port: 3001,
    logLevel: 'info',
  })
})

test('rejects missing or non-PostgreSQL database URLs without echoing secrets', () => {
  assert.throws(() => loadServerConfig({}), /DATABASE_URL is required/)
  assert.throws(
    () => loadServerConfig({ ...validEnv, DATABASE_URL: 'https://user:secret@example.test/db' }),
    (error) => error.message.includes('PostgreSQL') && !error.message.includes('secret'),
  )
})

test('rejects invalid ports and log levels', () => {
  assert.throws(() => loadServerConfig({ ...validEnv, PORT: '70000' }), /PORT/)
  assert.throws(() => loadServerConfig({ ...validEnv, LOG_LEVEL: 'verbose' }), /LOG_LEVEL/)
})
