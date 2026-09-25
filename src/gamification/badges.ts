import type { Month } from '@/content/types'
import type { ProgressState } from '@/progress/schema'
import { isMonthComplete } from '@/progress/selectors'
import { computeStreak, type Streak } from './streak'

function totalChecked(progress: ProgressState): number {
  return Object.keys(progress.checked).length
}

function nonEmptyNoteCount(progress: ProgressState): number {
  return Object.values(progress.notes).filter((note) => note.trim() !== '').length
}

function monthByNumber(months: Month[], number: number): Month | undefined {
  return months.find((m) => m.number === number)
}

export interface BadgeContext {
  months: Month[]
  progress: ProgressState
  streak: Streak
}

export interface Badge {
  id: string
  title: string
  description: string
  isUnlocked: (ctx: BadgeContext) => boolean
}

/**
 * Fixed achievement catalog. Unlock state is always derived from existing
 * progress (never stored) — see ProgressProvider for the small bit of state
 * that IS persisted: which unlocks the user has already seen celebrated.
 */
export const BADGES: Badge[] = [
  {
    id: 'first-light',
    title: 'First Light',
    description: 'Check off your first item on the roadmap.',
    isUnlocked: ({ progress }) => totalChecked(progress) >= 1,
  },
  {
    id: 'solder-slinger',
    title: 'Solder Slinger',
    description: 'Complete Month 1 — electronics, tools, and soldering.',
    isUnlocked: ({ months, progress }) => {
      const month = monthByNumber(months, 1)
      return !!month && isMonthComplete(month, progress)
    },
  },
  {
    id: 'its-alive',
    title: "It's Alive",
    description: 'Build your first moving robot.',
    isUnlocked: ({ progress }) => 'm2.robots.practice' in progress.checked,
  },
  {
    id: 'on-the-grid',
    title: 'On the Grid',
    description: 'Complete Month 4 — ROS 2, simulation, SLAM, and Nav2.',
    isUnlocked: ({ months, progress }) => {
      const month = monthByNumber(months, 4)
      return !!month && isMonthComplete(month, progress)
    },
  },
  {
    id: 'direction-chosen',
    title: 'Direction Chosen',
    description: 'Pick a career direction.',
    isUnlocked: ({ progress }) => progress.direction !== null,
  },
  {
    id: 'note-taker',
    title: 'Note Taker',
    description: 'Log what broke — and how you fixed it — five times.',
    isUnlocked: ({ progress }) => nonEmptyNoteCount(progress) >= 5,
  },
  {
    id: 'streak-7',
    title: '7-Day Streak',
    description: 'Show up seven days in a row.',
    isUnlocked: ({ streak }) => streak.longest >= 7,
  },
  {
    id: 'streak-30',
    title: '30-Day Streak',
    description: 'Show up thirty days in a row.',
    isUnlocked: ({ streak }) => streak.longest >= 30,
  },
  {
    id: 'six-months-fully-built',
    title: 'Six Months, Fully Built',
    description: 'Complete every month of the roadmap.',
    isUnlocked: ({ months, progress }) => months.length > 0 && months.every((m) => isMonthComplete(m, progress)),
  },
]

export interface EvaluatedBadge extends Badge {
  unlocked: boolean
}

export function evaluateBadges(months: Month[], progress: ProgressState, now?: () => Date): EvaluatedBadge[] {
  const ctx: BadgeContext = { months, progress, streak: computeStreak(progress, now) }
  return BADGES.map((badge) => ({ ...badge, unlocked: badge.isUnlocked(ctx) }))
}

export function unlockedBadgeIds(months: Month[], progress: ProgressState, now?: () => Date): string[] {
  return evaluateBadges(months, progress, now)
    .filter((badge) => badge.unlocked)
    .map((badge) => badge.id)
}
