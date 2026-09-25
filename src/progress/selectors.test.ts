import { describe, expect, it } from 'vitest'
import type { Month } from '@/content/types'
import { createInitialState } from './schema'
import { toggleItem } from './store'
import { completedCount, isMonthComplete, monthPercent, nextUp, overallPercent, trackableIds } from './selectors'

function makeMonth(overrides: Partial<Month> = {}): Month {
  const id = overrides.id ?? 'm1'
  return {
    id,
    number: 1,
    slug: 'month-1',
    title: 'Electronics',
    goal: 'test',
    framing: 'test',
    subsections: [
      {
        id: 's1',
        title: 'Section 1',
        focusPoints: [
          { id: `${id}.s1.focus.1`, label: 'Ohms law' },
          { id: `${id}.s1.focus.2`, label: 'Voltage dividers' },
        ],
        practiceTask: { id: `${id}.s1.practice`, summary: 'Build a divider' },
      },
    ],
    milestones: [{ id: `${id}.milestone.1`, label: 'Read a schematic' }],
    ...overrides,
  }
}

describe('trackableIds', () => {
  it('collects focus points, practice tasks, and milestones', () => {
    const ids = trackableIds(makeMonth())
    expect(ids).toEqual(['m1.s1.focus.1', 'm1.s1.focus.2', 'm1.s1.practice', 'm1.milestone.1'])
  })
})

describe('monthPercent', () => {
  it('is 0 with nothing checked', () => {
    expect(monthPercent(makeMonth(), createInitialState())).toBe(0)
  })

  it('rounds to the nearest percent as items are checked', () => {
    const state = toggleItem(toggleItem(createInitialState(), 'm1.s1.focus.1'), 'm1.s1.focus.2')
    expect(monthPercent(makeMonth(), state)).toBe(50)
  })

  it('is 100 once every trackable item is checked', () => {
    let state = createInitialState()
    for (const id of trackableIds(makeMonth())) state = toggleItem(state, id)
    expect(monthPercent(makeMonth(), state)).toBe(100)
  })
})

describe('isMonthComplete', () => {
  it('is false with nothing checked', () => {
    expect(isMonthComplete(makeMonth(), createInitialState())).toBe(false)
  })

  it('is false when some, but not all, trackable items are checked', () => {
    const state = toggleItem(createInitialState(), 'm1.s1.focus.1')
    expect(isMonthComplete(makeMonth(), state)).toBe(false)
  })

  it('is true only once every trackable item is checked', () => {
    let state = createInitialState()
    const month = makeMonth()
    for (const id of trackableIds(month)) state = toggleItem(state, id)
    expect(isMonthComplete(month, state)).toBe(true)
  })
})

describe('overallPercent / completedCount', () => {
  it('aggregates across months', () => {
    const months = [makeMonth(), makeMonth({ id: 'm2', number: 2, slug: 'month-2' })]
    const state = toggleItem(createInitialState(), 'm1.s1.focus.1')
    expect(completedCount(months, state)).toEqual({ done: 1, total: 8 })
    expect(overallPercent(months, state)).toBe(13)
  })
})

describe('nextUp', () => {
  it('returns the first unchecked focus point', () => {
    const result = nextUp([makeMonth()], createInitialState())
    expect(result?.id).toBe('m1.s1.focus.1')
  })

  it('falls through to the practice task once focus points are done', () => {
    let state = createInitialState()
    state = toggleItem(state, 'm1.s1.focus.1')
    state = toggleItem(state, 'm1.s1.focus.2')
    const result = nextUp([makeMonth()], state)
    expect(result?.id).toBe('m1.s1.practice')
  })

  it('returns null when everything is done', () => {
    let state = createInitialState()
    const month = makeMonth()
    for (const id of trackableIds(month)) state = toggleItem(state, id)
    expect(nextUp([month], state)).toBeNull()
  })
})
