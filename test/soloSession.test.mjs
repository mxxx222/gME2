import assert from 'node:assert/strict'
import test from 'node:test'
import { createSoloSessionConfiguration } from '../src/lib/soloSession.ts'

test('builds a session configuration from an activity and its established duration', () => {
  assert.deepEqual(
    createSoloSessionConfiguration({ id: 'arrive', duration: 2 }, 120_000, 'Take a breath.'),
    { activityId: 'arrive', durationMs: 120_000, prompt: 'Take a breath.' },
  )
})

test('rejects invalid timing without modifying an existing valid configuration', () => {
  const validConfiguration = createSoloSessionConfiguration(
    { id: 'arrive', duration: 2 },
    120_000,
    'Take a breath.',
  )

  assert.ok(validConfiguration)
  assert.equal(
    createSoloSessionConfiguration({ id: 'arrive', duration: 2 }, 0, 'Take a breath.'),
    null,
  )
  assert.equal(
    createSoloSessionConfiguration({ id: 'arrive', duration: 2 }, 300_000, 'Take a breath.'),
    null,
  )
  assert.equal(
    createSoloSessionConfiguration({ id: 'arrive', duration: 2 }, 120_000, ' '),
    null,
  )
  assert.deepEqual(validConfiguration, {
    activityId: 'arrive',
    durationMs: 120_000,
    prompt: 'Take a breath.',
  })
})
