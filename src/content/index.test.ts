import { describe, expect, it } from 'vitest'
import { allResources, getMonth, getMonthBySlug, months } from './index'
import { trackableIds } from '@/progress/selectors'

describe('content integrity', () => {
  it('has exactly six months, numbered 1 through 6', () => {
    expect(months).toHaveLength(6)
    expect(months.map((m) => m.number).sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('every month has a goal, a framing, and at least one milestone', () => {
    for (const month of months) {
      expect(month.goal.length).toBeGreaterThan(0)
      expect(month.framing.length).toBeGreaterThan(0)
      expect(month.milestones.length).toBeGreaterThan(0)
    }
  })

  it('every trackable id across all months is globally unique', () => {
    const allIds = months.flatMap(trackableIds)
    const unique = new Set(allIds)
    expect(unique.size).toBe(allIds.length)
  })

  it('every resource has a well-formed URL', () => {
    for (const resource of allResources) {
      expect(resource.url).toMatch(/^https?:\/\/.+/)
    }
  })

  it('every resource id is globally unique', () => {
    const ids = allResources.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('getMonth finds a month by number, and returns undefined otherwise', () => {
    expect(getMonth(1)?.title).toContain('Electronics')
    expect(getMonth(99)).toBeUndefined()
  })

  it('getMonthBySlug finds a month by slug, and returns undefined otherwise', () => {
    expect(getMonthBySlug('electronics-and-tools')?.number).toBe(1)
    expect(getMonthBySlug('not-a-real-slug')).toBeUndefined()
  })

  it('every month slug is unique and url-safe', () => {
    const slugs = months.map((m) => m.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/)
    }
  })
})
