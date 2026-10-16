import assert from 'node:assert/strict'
import test from 'node:test'
import { createDatabasePool } from '../../server/db/pool.ts'

test('handles idle pool errors with a sanitized log message', async () => {
  const pool = createDatabasePool({ databaseUrl: 'postgresql://127.0.0.1:5432/gme2_test' })
  const originalWrite = process.stderr.write
  let output = ''

  process.stderr.write = (chunk) => {
    output += chunk
    return true
  }
  try {
    assert.equal(pool.emit('error', new Error('private connection detail')), true)
  } finally {
    process.stderr.write = originalWrite
    await pool.end()
  }

  assert.match(output, /database_pool_error/)
  assert.doesNotMatch(output, /private connection detail/)
})
