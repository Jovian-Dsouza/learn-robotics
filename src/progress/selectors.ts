import type { Month } from '@/content/types'
import type { ProgressState } from './schema'

/** Every trackable id within a month: focus points, practice tasks, milestones. */
export function trackableIds(month: Month): string[] {
  const ids: string[] = []
  for (const section of month.subsections) {
    for (const focus of section.focusPoints ?? []) ids.push(focus.id)
    if (section.practiceTask) ids.push(section.practiceTask.id)
  }
  for (const milestone of month.milestones) ids.push(milestone.id)
  return ids
}

export function monthPercent(month: Month, progress: ProgressState): number {
  const ids = trackableIds(month)
  if (ids.length === 0) return 0
  const done = ids.filter((id) => id in progress.checked).length
  return Math.round((done / ids.length) * 100)
}

/**
 * Whether every trackable item in the month is checked. Deliberately exact
 * (not `monthPercent(...) >= 100`) — Math.round can reach 100 while a couple
 * of items remain unchecked once a month has enough items (e.g. 199/200 rounds
 * up to 100%).
 */
export function isMonthComplete(month: Month, progress: ProgressState): boolean {
  const ids = trackableIds(month)
  return ids.length > 0 && ids.every((id) => id in progress.checked)
}

export function overallPercent(months: Month[], progress: ProgressState): number {
  const allIds = months.flatMap(trackableIds)
  if (allIds.length === 0) return 0
  const done = allIds.filter((id) => id in progress.checked).length
  return Math.round((done / allIds.length) * 100)
}

export function completedCount(months: Month[], progress: ProgressState): { done: number; total: number } {
  const allIds = months.flatMap(trackableIds)
  return { done: allIds.filter((id) => id in progress.checked).length, total: allIds.length }
}

export interface NextUpItem {
  monthNumber: number
  monthSlug: string
  id: string
  label: string
}

/** The first unchecked trackable item, in month/section order — what the dashboard points the user at next. */
export function nextUp(months: Month[], progress: ProgressState): NextUpItem | null {
  const sorted = [...months].sort((a, b) => a.number - b.number)
  for (const month of sorted) {
    for (const section of month.subsections) {
      for (const focus of section.focusPoints ?? []) {
        if (!(focus.id in progress.checked)) {
          return { monthNumber: month.number, monthSlug: month.slug, id: focus.id, label: focus.label }
        }
      }
      if (section.practiceTask && !(section.practiceTask.id in progress.checked)) {
        return { monthNumber: month.number, monthSlug: month.slug, id: section.practiceTask.id, label: section.practiceTask.summary }
      }
    }
    for (const milestone of month.milestones) {
      if (!(milestone.id in progress.checked)) {
        return { monthNumber: month.number, monthSlug: month.slug, id: milestone.id, label: milestone.label }
      }
    }
  }
  return null
}
