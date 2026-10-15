import { challenges, type Challenge } from '../data/challenges.ts'

export function assertValidChallengeCatalog(catalog: readonly Challenge[]) {
  const challengeIds = new Set<string>()
  const activityIds = new Set<string>()

  for (const challenge of catalog) {
    if (typeof challenge.id !== 'string' || !challenge.id.trim() || challengeIds.has(challenge.id)) {
      throw new Error('Challenge IDs must be non-empty and unique.')
    }
    challengeIds.add(challenge.id)

    for (const activity of challenge.days) {
      if (
        typeof activity.activityId !== 'string'
        || !activity.activityId.trim()
        || activityIds.has(activity.activityId)
      ) {
        throw new Error('Activity IDs must be non-empty and globally unique.')
      }
      activityIds.add(activity.activityId)
    }
  }
}

assertValidChallengeCatalog(challenges)

const activityIdsByChallenge = new Map(
  challenges.map((challenge) => [challenge.id, new Set(challenge.days.map((activity) => activity.activityId))]),
)

export function isSupportedChallengeActivity(challengeId: string, activityId: string) {
  return activityIdsByChallenge.get(challengeId)?.has(activityId) ?? false
}
