import { describe, expect, it } from 'vitest'
import type { Month } from '@/content/types'
import { createInitialState, type ProgressState } from '@/progress/schema'
import { toggleItem, setNote, setDirection } from '@/progress/store'
import { BADGES, evaluateBadges, unlockedBadgeIds } from './badges'

function makeMonth(number: number, practiceId: string): Month {
  return {
    id: `m${number}`,
    number,
    slug: `month-${number}`,
    title: `Month ${number}`,
    goal: 'test',
    framing: 'test',
    subsections: [
      {
        id: 's1',
        title: 'Section 1',
        focusPoints: [{ id: `m${number}.focus.1`, label: 'a' }],
        practiceTask: { id: practiceId, summary: 'build it' },
      },
    ],
    milestones: [{ id: `m${number}.milestone.1`, label: 'do it' }],
  }
}

function fullMonths(): Month[] {
  return [1, 2, 3, 4, 5, 6].map((n) => makeMonth(n, n === 2 ? 'm2.robots.practice' : `m${n}.practice`))
}

function checkAllOf(months: Month[], state: ProgressState): ProgressState {
  let next = state
  for (const month of months) {
    for (const section of month.subsections) {
      for (const focus of section.focusPoints ?? []) next = toggleItem(next, focus.id)
      if (section.practiceTask) next = toggleItem(next, section.practiceTask.id)
    }
    for (const milestone of month.milestones) next = toggleItem(next, milestone.id)
  }
  return next
}

describe('BADGES catalog', () => {
  it('has no duplicate ids', () => {
    const ids = BADGES.map((b) => b.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every badge has a non-empty title and description', () => {
    for (const badge of BADGES) {
      expect(badge.title.length).toBeGreaterThan(0)
      expect(badge.description.length).toBeGreaterThan(0)
    }
  })
})

describe('evaluateBadges', () => {
  it('nothing is unlocked from a fresh state', () => {
    const results = evaluateBadges(fullMonths(), createInitialState())
    expect(results.every((b) => !b.unlocked)).toBe(true)
  })

  it('unlocks "first light" after checking any single item', () => {
    const state = toggleItem(createInitialState(), fullMonths()[0].milestones[0].id)
    const results = evaluateBadges(fullMonths(), state)
    expect(results.find((b) => b.id === 'first-light')?.unlocked).toBe(true)
  })

  it('unlocks the month-1-complete badge only once every month-1 item is checked', () => {
    const months = fullMonths()
    const partial = toggleItem(createInitialState(), 'm1.focus.1')
    expect(evaluateBadges(months, partial).find((b) => b.id === 'solder-slinger')?.unlocked).toBe(false)

    const complete = checkAllOf([months[0]], createInitialState())
    expect(evaluateBadges(months, complete).find((b) => b.id === 'solder-slinger')?.unlocked).toBe(true)
  })

  it('unlocks "it\'s alive" specifically on the month-2 robot practice task', () => {
    const state = toggleItem(createInitialState(), 'm2.robots.practice')
    const results = evaluateBadges(fullMonths(), state)
    expect(results.find((b) => b.id === 'its-alive')?.unlocked).toBe(true)
  })

  it('unlocks "direction chosen" once a direction is set', () => {
    const state = setDirection(createInitialState(), 2)
    expect(evaluateBadges(fullMonths(), state).find((b) => b.id === 'direction-chosen')?.unlocked).toBe(true)
  })

  it('unlocks "note taker" only at 5 or more non-empty notes', () => {
    let state = createInitialState()
    for (let i = 0; i < 4; i++) state = setNote(state, `item-${i}`, `note ${i}`)
    expect(evaluateBadges(fullMonths(), state).find((b) => b.id === 'note-taker')?.unlocked).toBe(false)

    state = setNote(state, 'item-4', 'note 4')
    expect(evaluateBadges(fullMonths(), state).find((b) => b.id === 'note-taker')?.unlocked).toBe(true)
  })

  it('empty/whitespace notes do not count toward "note taker"', () => {
    let state = createInitialState()
    for (let i = 0; i < 5; i++) state = setNote(state, `item-${i}`, '   ')
    expect(evaluateBadges(fullMonths(), state).find((b) => b.id === 'note-taker')?.unlocked).toBe(false)
  })

  it('unlocks streak badges based on the longest streak, using an injected clock', () => {
    let state = createInitialState()
    const days = ['2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04', '2026-01-05', '2026-01-06', '2026-01-07']
    days.forEach((day, i) => {
      state = { ...state, checked: { ...state.checked, [`item-${i}`]: `${day}T08:00:00.000Z` } }
    })
    const now = () => new Date('2026-06-01T00:00:00.000Z')
    const results = evaluateBadges(fullMonths(), state, now)
    expect(results.find((b) => b.id === 'streak-7')?.unlocked).toBe(true)
    expect(results.find((b) => b.id === 'streak-30')?.unlocked).toBe(false)
  })

  it('unlocks "six months, fully built" only once every month is complete', () => {
    const months = fullMonths()
    const allButLast = checkAllOf(months.slice(0, 5), createInitialState())
    expect(evaluateBadges(months, allButLast).find((b) => b.id === 'six-months-fully-built')?.unlocked).toBe(false)

    const everything = checkAllOf(months, createInitialState())
    expect(evaluateBadges(months, everything).find((b) => b.id === 'six-months-fully-built')?.unlocked).toBe(true)
  })
})

describe('unlockedBadgeIds', () => {
  it('returns only the ids of unlocked badges', () => {
    const state = toggleItem(createInitialState(), 'm1.milestone.1')
    const ids = unlockedBadgeIds(fullMonths(), state)
    expect(ids).toContain('first-light')
    expect(ids).not.toContain('six-months-fully-built')
  })
})
