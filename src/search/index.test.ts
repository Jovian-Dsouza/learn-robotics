import { describe, expect, it } from 'vitest'
import type { Month } from '@/content/types'
import { buildSearchIndex } from './index'

function makeMonth(): Month {
  return {
    id: 'm1',
    number: 1,
    slug: 'month-1',
    title: 'Electronics',
    goal: 'test goal',
    framing: 'test framing',
    subsections: [
      {
        id: 'm1.s1',
        title: 'Section One',
        intro: 'an intro',
        resources: [{ id: 'm1.s1.res', name: 'Falstad', price: 'free', url: 'https://falstad.com', note: 'a simulator' }],
        focusPoints: [{ id: 'm1.s1.focus.1', label: "Ohm's law" }],
        practiceTask: { id: 'm1.s1.practice', summary: 'Build a divider' },
      },
    ],
    milestones: [{ id: 'm1.milestone.1', label: 'Read a schematic' }],
  }
}

describe('buildSearchIndex', () => {
  const index = buildSearchIndex([makeMonth()])

  it('includes one item per month, section, focus point, practice task, resource, and milestone', () => {
    const ids = index.map((i) => i.id)
    expect(ids).toEqual(
      expect.arrayContaining(['m1', 'm1.s1', 'm1.s1.focus.1', 'm1.s1.practice', 'm1.s1.res', 'm1.milestone.1']),
    )
  })

  it('includes the fixed set of static pages', () => {
    expect(index.some((i) => i.kind === 'page' && i.title === 'Dashboard')).toBe(true)
    expect(index.some((i) => i.kind === 'page' && i.title === 'Mind Maps')).toBe(true)
  })

  it('every item has a non-empty title and a url starting with /', () => {
    for (const item of index) {
      expect(item.title.length).toBeGreaterThan(0)
      expect(item.url.startsWith('/')).toBe(true)
    }
  })

  it('links a section item to the month, with a scrollTo for that section', () => {
    const section = index.find((i) => i.id === 'm1.s1')
    expect(section?.url).toBe('/month/month-1?scrollTo=m1.s1')
  })

  it('the month item itself has no scrollTo (scrolls to top)', () => {
    const month = index.find((i) => i.id === 'm1')
    expect(month?.url).toBe('/month/month-1')
  })

  it('carries the price through on resource items only', () => {
    const resource = index.find((i) => i.id === 'm1.s1.res')
    expect(resource?.price).toBe('free')
    const focus = index.find((i) => i.id === 'm1.s1.focus.1')
    expect(focus?.price).toBeUndefined()
  })

  it('has no duplicate ids', () => {
    const ids = index.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
