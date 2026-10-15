import assert from 'node:assert/strict'
import test from 'node:test'
import {
  completeChallengeDay,
  getNextIncompleteDay,
  isChallengeComplete,
  normalizeCompletedDays,
} from '../src/lib/challengeProgress.ts'

test('normalizes duplicate and invalid completed day indices', () => {
  assert.deepEqual(normalizeCompletedDays([3, 1, 3, -1, 7, 1.5], 7), [1, 3])
})

test('completes an activity idempotently and keeps indices sorted', () => {
  assert.deepEqual(completeChallengeDay([4, 1, 4], 2, 7), [1, 2, 4])
  assert.deepEqual(completeChallengeDay([1, 2], 2, 7), [1, 2])
})

test('ignores an out-of-range activity completion', () => {
  assert.deepEqual(completeChallengeDay([1], 7, 7), [1])
  assert.deepEqual(completeChallengeDay([1], -1, 7), [1])
})

test('finds the first incomplete activity independent of completion order', () => {
  assert.equal(getNextIncompleteDay([0, 1, 3, 4], 7), 2)
  assert.equal(getNextIncompleteDay([5, 3, 2, 4, 0, 1], 7), 6)
})

test('reports completion only when every valid activity is done', () => {
  assert.equal(isChallengeComplete([6, 2, 4, 0, 1, 3], 7), false)
  assert.equal(isChallengeComplete([6, 2, 4, 0, 1, 3, 5, 5, 9], 7), true)
  assert.equal(isChallengeComplete([], 0), false)
})
