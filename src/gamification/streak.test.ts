import { describe, expect, it } from 'vitest'
import { createInitialState, type ProgressState } from '@/progress/schema'
import { activeDays, computeStreak } from './streak'

function withChecked(dates: string[]): ProgressState {
  const state = createInitialState()
  const checked: Record<string, string> = {}
  dates.forEach((date, i) => {
    checked[`item-${i}`] = date
  })
  return { ...state, checked }
}

describe('activeDays', () => {
  it('is empty with nothing checked', () => {
    expect(activeDays(createInitialState()).size).toBe(0)
  })

  it('buckets timestamps by calendar day, deduping same-day entries', () => {
    const state = withChecked(['2026-01-01T08:00:00.000Z', '2026-01-01T22:00:00.000Z', '2026-01-02T09:00:00.000Z'])
    const days = activeDays(state)
    expect(days.size).toBe(2)
    expect(days.has('2026-01-01')).toBe(true)
    expect(days.has('2026-01-02')).toBe(true)
  })
})

describe('computeStreak', () => {
  it('is {current: 0, longest: 0} with nothing checked', () => {
    expect(computeStreak(createInitialState(), () => new Date('2026-01-10T12:00:00.000Z'))).toEqual({
      current: 0,
      longest: 0,
    })
  })

  it('counts a single active day as a streak of 1 when it is today', () => {
    const state = withChecked(['2026-01-10T08:00:00.000Z'])
    const result = computeStreak(state, () => new Date('2026-01-10T20:00:00.000Z'))
    expect(result).toEqual({ current: 1, longest: 1 })
  })

  it('counts consecutive days ending today as the current streak', () => {
    const state = withChecked(['2026-01-08T08:00:00.000Z', '2026-01-09T08:00:00.000Z', '2026-01-10T08:00:00.000Z'])
    const result = computeStreak(state, () => new Date('2026-01-10T20:00:00.000Z'))
    expect(result.current).toBe(3)
  })

  it('current streak is 0 once a day is missed before today', () => {
    const state = withChecked(['2026-01-05T08:00:00.000Z', '2026-01-06T08:00:00.000Z'])
    const result = computeStreak(state, () => new Date('2026-01-10T20:00:00.000Z'))
    expect(result.current).toBe(0)
  })

  it('still counts yesterday as keeping the streak alive if today has no activity yet', () => {
    const state = withChecked(['2026-01-08T08:00:00.000Z', '2026-01-09T08:00:00.000Z'])
    const result = computeStreak(state, () => new Date('2026-01-10T07:00:00.000Z'))
    expect(result.current).toBe(2)
  })

  it('longest streak survives even after the current streak breaks', () => {
    const state = withChecked([
      '2026-01-01T08:00:00.000Z',
      '2026-01-02T08:00:00.000Z',
      '2026-01-03T08:00:00.000Z',
      '2026-01-03T09:00:00.000Z',
      '2026-01-08T08:00:00.000Z',
    ])
    const result = computeStreak(state, () => new Date('2026-01-10T20:00:00.000Z'))
    expect(result.longest).toBe(3)
    expect(result.current).toBe(0)
  })
})
