import assert from 'node:assert/strict'
import test from 'node:test'
import { challenges, challengeCatalogVersion } from '../src/data/challenges.ts'
import {
  assertValidChallengeCatalog,
  isSupportedChallengeActivity,
} from '../src/lib/challengeCatalog.ts'

test('the challenge catalog has a version and complete, globally unique activity identifiers', () => {
  assert.equal(challengeCatalogVersion, 1)
  assert.doesNotThrow(() => assertValidChallengeCatalog(challenges))
  assert.equal(challenges.reduce((total, challenge) => total + challenge.days.length, 0), 21)
})

test('rejects missing and duplicate activity identifiers', () => {
  const missingId = structuredClone(challenges)
  delete missingId[0].days[0].activityId
  assert.throws(() => assertValidChallengeCatalog(missingId), /Activity IDs/)

  const duplicateId = structuredClone(challenges)
  duplicateId[0].days[1].activityId = duplicateId[0].days[0].activityId
  assert.throws(() => assertValidChallengeCatalog(duplicateId), /Activity IDs/)
})

test('activity identifiers stay stable when challenge and activity order changes', () => {
  const expectedIds = challenges.flatMap((challenge) => challenge.days.map((activity) => [challenge.id, activity.activityId]))
  const reorderedChallenges = [...challenges].reverse().map((challenge) => ({
    ...challenge,
    days: [...challenge.days].reverse(),
  }))

  assert.deepEqual(
    reorderedChallenges.flatMap((challenge) => challenge.days.map((activity) => [challenge.id, activity.activityId])).sort(),
    expectedIds.toSorted(),
  )
  for (const [challengeId, activityId] of expectedIds) {
    assert.equal(isSupportedChallengeActivity(challengeId, activityId), true)
  }
})
