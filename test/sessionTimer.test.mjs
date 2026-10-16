import assert from 'node:assert/strict'
import test from 'node:test'
import {
  createSessionTimer,
  getRemainingSeconds,
  sessionTimerReducer,
} from '../src/lib/sessionTimer.ts'

test('creates an idle timer with its full duration', () => {
  assert.deepEqual(createSessionTimer(45_000), {
    status: 'idle',
    durationMs: 45_000,
    remainingMs: 45_000,
    deadlineMs: null,
  })
})

test('starts, pauses, and resumes from a deadline-based remaining time', () => {
  const running = sessionTimerReducer(createSessionTimer(60_000), { type: 'start', nowMs: 1_000 })
  assert.equal(running.status, 'running')
  assert.equal(running.deadlineMs, 61_000)
  assert.equal(getRemainingSeconds(running, 10_250), 51)

  const paused = sessionTimerReducer(running, { type: 'pause', nowMs: 10_250 })
  assert.equal(paused.status, 'paused')
  assert.equal(paused.remainingMs, 50_750)
  assert.equal(paused.deadlineMs, null)

  const resumed = sessionTimerReducer(paused, { type: 'resume', nowMs: 20_000 })
  assert.equal(resumed.status, 'running')
  assert.equal(resumed.deadlineMs, 70_750)
  assert.equal(getRemainingSeconds(resumed, 21_000), 50)
})

test('late timer callbacks calculate elapsed time instead of losing time', () => {
  const running = sessionTimerReducer(createSessionTimer(45_000), { type: 'start', nowMs: 10_000 })
  const lateTick = sessionTimerReducer(running, { type: 'tick', nowMs: 32_500 })
  assert.equal(lateTick.remainingMs, 22_500)
  assert.equal(getRemainingSeconds(lateTick, 32_500), 23)
})

test('completes exactly once when a tick reaches or passes the deadline', () => {
  const running = sessionTimerReducer(createSessionTimer(1_000), { type: 'start', nowMs: 10_000 })
  const complete = sessionTimerReducer(running, { type: 'tick', nowMs: 11_500 })
  assert.equal(complete.status, 'complete')
  assert.equal(complete.remainingMs, 0)
  assert.equal(sessionTimerReducer(complete, { type: 'tick', nowMs: 12_000 }), complete)
  assert.equal(sessionTimerReducer(complete, { type: 'resume', nowMs: 12_000 }), complete)
})

test('stop and start-over return to idle at the full duration', () => {
  const running = sessionTimerReducer(createSessionTimer(60_000), { type: 'start', nowMs: 0 })
  const stopped = sessionTimerReducer(running, { type: 'stop' })
  assert.equal(stopped.status, 'idle')
  assert.equal(stopped.remainingMs, 60_000)
  assert.deepEqual(sessionTimerReducer(running, { type: 'reset', durationMs: 30_000 }), createSessionTimer(30_000))
})

test('ignores repeated or invalid state transitions', () => {
  const idle = createSessionTimer(10_000)
  assert.equal(sessionTimerReducer(idle, { type: 'pause', nowMs: 0 }), idle)
  assert.equal(sessionTimerReducer(idle, { type: 'resume', nowMs: 0 }), idle)
  const running = sessionTimerReducer(idle, { type: 'start', nowMs: 0 })
  assert.equal(sessionTimerReducer(running, { type: 'start', nowMs: 1_000 }), running)
  assert.throws(() => createSessionTimer(0), RangeError)
})
