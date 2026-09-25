import { describe, expect, it } from 'vitest'
import type { Month } from '@/content/types'
import { createInitialState } from '@/progress/schema'
import { toggleItem } from '@/progress/store'
import { levelForXp, levelTitle, totalXp, xpRangeForLevel, XP_VALUES } from './xp'

function makeMonth(): Month {
  return {
    id: 'm1',
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
          { id: 'm1.s1.focus.1', label: 'a' },
          { id: 'm1.s1.focus.2', label: 'b' },
        ],
        practiceTask: { id: 'm1.s1.practice', summary: 'build it' },
      },
    ],
    milestones: [{ id: 'm1.milestone.1', label: 'do it' }],
  }
}

describe('totalXp', () => {
  it('is 0 with nothing checked', () => {
    expect(totalXp([makeMonth()], createInitialState())).toBe(0)
  })

  it('awards focus-point XP for a checked focus point', () => {
    const state = toggleItem(createInitialState(), 'm1.s1.focus.1')
    expect(totalXp([makeMonth()], state)).toBe(XP_VALUES.focusPoint)
  })

  it('awards practice-task XP, worth more than a focus point', () => {
    const state = toggleItem(createInitialState(), 'm1.s1.practice')
    expect(totalXp([makeMonth()], state)).toBe(XP_VALUES.practiceTask)
    expect(XP_VALUES.practiceTask).toBeGreaterThan(XP_VALUES.focusPoint)
  })

  it('awards milestone XP, worth more than a practice task', () => {
    const state = toggleItem(createInitialState(), 'm1.milestone.1')
    expect(totalXp([makeMonth()], state)).toBe(XP_VALUES.milestone)
    expect(XP_VALUES.milestone).toBeGreaterThan(XP_VALUES.practiceTask)
  })

  it('sums across every checked item', () => {
    let state = createInitialState()
    for (const id of ['m1.s1.focus.1', 'm1.s1.focus.2', 'm1.s1.practice', 'm1.milestone.1']) {
      state = toggleItem(state, id)
    }
    expect(totalXp([makeMonth()], state)).toBe(
      XP_VALUES.focusPoint * 2 + XP_VALUES.practiceTask + XP_VALUES.milestone,
    )
  })

  it('ignores ids that are checked but no longer exist in the content', () => {
    const state = toggleItem(createInitialState(), 'not-a-real-id')
    expect(totalXp([makeMonth()], state)).toBe(0)
  })
})

describe('levelForXp', () => {
  it('starts at level 1 with 0 XP', () => {
    expect(levelForXp(0)).toBe(1)
  })

  it('never returns a level below 1, even for negative input', () => {
    expect(levelForXp(-100)).toBe(1)
  })

  it('increases as XP increases', () => {
    const low = levelForXp(50)
    const high = levelForXp(5000)
    expect(high).toBeGreaterThan(low)
  })

  it('is monotonically non-decreasing', () => {
    let previous = levelForXp(0)
    for (let xp = 0; xp <= 5000; xp += 50) {
      const level = levelForXp(xp)
      expect(level).toBeGreaterThanOrEqual(previous)
      previous = level
    }
  })
})

describe('xpRangeForLevel', () => {
  it('matches levelForXp at the boundaries — xp just inside [min, max) is that level', () => {
    for (let level = 1; level <= 10; level++) {
      const { min, max } = xpRangeForLevel(level)
      expect(levelForXp(min)).toBe(level)
      expect(levelForXp(max - 1)).toBe(level)
      expect(levelForXp(max)).toBe(level + 1)
    }
  })

  it('clamps to level 1 for anything below it', () => {
    expect(xpRangeForLevel(0)).toEqual(xpRangeForLevel(1))
  })
})

describe('levelTitle', () => {
  it('returns a non-empty title for level 1', () => {
    expect(levelTitle(1).length).toBeGreaterThan(0)
  })

  it('returns a different title at a much higher level', () => {
    expect(levelTitle(1)).not.toBe(levelTitle(20))
  })

  it('clamps to the top title instead of throwing for an extreme level', () => {
    expect(() => levelTitle(9999)).not.toThrow()
    expect(levelTitle(9999)).toBe(levelTitle(1000))
  })

  it('never overclaims seniority the roadmap itself says six months cannot produce', () => {
    for (let level = 1; level <= 50; level++) {
      expect(levelTitle(level).toLowerCase()).not.toContain('senior')
    }
  })
})
