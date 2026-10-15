export type TimedActivity = {
  id: string
  duration: number
}

export type SoloSessionConfiguration = Readonly<{
  activityId: string
  durationMs: number
  prompt: string
}>

export function createSoloSessionConfiguration(
  activity: TimedActivity,
  durationMs: number,
  prompt: string,
): SoloSessionConfiguration | null {
  if (
    !activity.id.trim()
    || !Number.isSafeInteger(activity.duration)
    || activity.duration <= 0
    || !Number.isSafeInteger(durationMs)
    || durationMs !== activity.duration * 60_000
    || !prompt.trim()
  ) {
    return null
  }

  return Object.freeze({ activityId: activity.id, durationMs, prompt })
}
