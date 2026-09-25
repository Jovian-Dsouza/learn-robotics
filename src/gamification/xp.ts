import type { Month } from '@/content/types'
import type { ProgressState } from '@/progress/schema'

/** Points per kind of trackable item — deeper commitments (a real build, a milestone) are worth more than a checkbox. */
export const XP_VALUES = {
  focusPoint: 10,
  practiceTask: 50,
  milestone: 100,
} as const

/** XP earned from the roadmap's own content only — a checked id that no longer exists in `months` earns nothing. */
export function totalXp(months: Month[], progress: ProgressState): number {
  let xp = 0
  for (const month of months) {
    for (const section of month.subsections) {
      for (const focus of section.focusPoints ?? []) {
        if (focus.id in progress.checked) xp += XP_VALUES.focusPoint
      }
      if (section.practiceTask && section.practiceTask.id in progress.checked) {
        xp += XP_VALUES.practiceTask
      }
    }
    for (const milestone of month.milestones) {
      if (milestone.id in progress.checked) xp += XP_VALUES.milestone
    }
  }
  return xp
}

export const XP_PER_LEVEL_STEP = 50

/** A gently accelerating level curve: each level costs more XP than the last. */
export function levelForXp(xp: number): number {
  const safeXp = Math.max(0, xp)
  return Math.floor(Math.sqrt(safeXp / XP_PER_LEVEL_STEP)) + 1
}

export interface XpRange {
  min: number
  max: number
}

/** The XP window [min, max) a level spans — the inverse of levelForXp, used to render a "progress to next level" bar. */
export function xpRangeForLevel(level: number): XpRange {
  const safeLevel = Math.max(1, level)
  return { min: (safeLevel - 1) ** 2 * XP_PER_LEVEL_STEP, max: safeLevel ** 2 * XP_PER_LEVEL_STEP }
}

// Titles deliberately stop short of "senior" — the roadmap's own outlook page
// is explicit that six months of building does not make anyone a senior
// robotics engineer. "Robotics Engineer" is the honest ceiling here.
const LEVEL_TITLES = [
  'Bench Rookie',
  'Breadboard Tinkerer',
  'Circuit Bender',
  'Motor Whisperer',
  'CAD Apprentice',
  'Motion Control Tech',
  'Systems Integrator',
  'Field Roboticist',
  'Robotics Engineer',
] as const

export function levelTitle(level: number): string {
  const index = Math.min(Math.max(level, 1), LEVEL_TITLES.length) - 1
  return LEVEL_TITLES[index]
}
