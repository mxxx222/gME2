export function normalizeCompletedDays(completedDays: number[], dayCount: number) {
  return [...new Set(completedDays)]
    .filter((day) => Number.isInteger(day) && day >= 0 && day < dayCount)
    .sort((left, right) => left - right)
}

export function completeChallengeDay(completedDays: number[], day: number, dayCount: number) {
  if (!Number.isInteger(day) || day < 0 || day >= dayCount) {
    return normalizeCompletedDays(completedDays, dayCount)
  }
  return normalizeCompletedDays([...completedDays, day], dayCount)
}

export function getNextIncompleteDay(completedDays: number[], dayCount: number) {
  const completed = new Set(normalizeCompletedDays(completedDays, dayCount))
  return Array.from({ length: dayCount }, (_, index) => index).find((day) => !completed.has(day)) ?? -1
}

export function isChallengeComplete(completedDays: number[], dayCount: number) {
  return dayCount > 0 && normalizeCompletedDays(completedDays, dayCount).length === dayCount
}
