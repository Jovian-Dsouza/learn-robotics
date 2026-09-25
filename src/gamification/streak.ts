import type { ProgressState } from '@/progress/schema'

const MS_PER_DAY = 86_400_000

/** `progress.checked` values are always `Date.toISOString()` (UTC), so the first 10 chars are a stable calendar day. */
function toDayString(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function dayStringToEpochDay(dayString: string): number {
  return Date.parse(`${dayString}T00:00:00.000Z`) / MS_PER_DAY
}

/** Every distinct calendar day (UTC) on which at least one item was checked. */
export function activeDays(progress: ProgressState): Set<string> {
  const days = new Set<string>()
  for (const timestamp of Object.values(progress.checked)) {
    const parsed = new Date(timestamp)
    if (!Number.isNaN(parsed.getTime())) days.add(toDayString(parsed))
  }
  return days
}

export interface Streak {
  current: number
  longest: number
}

/**
 * Current streak (consecutive active days ending today or, if nothing is
 * checked yet today, ending yesterday so the streak isn't lost mid-day) and
 * the longest run of consecutive active days ever.
 */
export function computeStreak(progress: ProgressState, now: () => Date = () => new Date()): Streak {
  const days = activeDays(progress)
  if (days.size === 0) return { current: 0, longest: 0 }

  const epochDays = new Set(Array.from(days, dayStringToEpochDay))
  const sorted = Array.from(epochDays).sort((a, b) => a - b)

  let longest = 1
  let run = 1
  for (let i = 1; i < sorted.length; i++) {
    run = sorted[i] - sorted[i - 1] === 1 ? run + 1 : 1
    longest = Math.max(longest, run)
  }

  let cursor = dayStringToEpochDay(toDayString(now()))
  if (!epochDays.has(cursor)) {
    cursor -= 1
    if (!epochDays.has(cursor)) return { current: 0, longest }
  }

  let current = 0
  while (epochDays.has(cursor)) {
    current += 1
    cursor -= 1
  }
  return { current, longest }
}
