import { directions } from './directions'
import { intro } from './intro'
import { month1 } from './months/month-1'
import { month2 } from './months/month-2'
import { month3 } from './months/month-3'
import { month4 } from './months/month-4'
import { month5 } from './months/month-5'
import { month6 } from './months/month-6'
import { outlook } from './outlook'
import { portfolio } from './portfolio'
import type { Month, Resource } from './types'

export const months: Month[] = [month1, month2, month3, month4, month5, month6]

export function getMonth(number: number): Month | undefined {
  return months.find((m) => m.number === number)
}

export function getMonthBySlug(slug: string): Month | undefined {
  return months.find((m) => m.slug === slug)
}

export const allResources: Resource[] = months.flatMap((month) =>
  month.subsections.flatMap((section) => section.resources ?? []),
)

export { directions, intro, outlook, portfolio }
export * from './types'
