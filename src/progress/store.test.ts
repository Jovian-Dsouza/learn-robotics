import { describe, expect, it } from 'vitest'
import { createInitialState } from './schema'
import { markBadgeSeen, setDirection, setNote, toggleBookmark, toggleItem } from './store'

describe('toggleItem', () => {
  it('checks an unchecked item and stamps it with the current time', () => {
    const state = createInitialState(() => '2026-01-01T00:00:00.000Z')
    const next = toggleItem(state, 'm1.electronics.practice', () => '2026-02-01T00:00:00.000Z')
    expect(next.checked['m1.electronics.practice']).toBe('2026-02-01T00:00:00.000Z')
  })

  it('unchecks a checked item', () => {
    const state = createInitialState()
    const checked = toggleItem(state, 'a')
    const unchecked = toggleItem(checked, 'a')
    expect(unchecked.checked).not.toHaveProperty('a')
  })

  it('never mutates the input state', () => {
    const state = createInitialState()
    const frozen = Object.freeze({ ...state, checked: Object.freeze({ ...state.checked }) })
    expect(() => toggleItem(frozen, 'a')).not.toThrow()
  })

  it('leaves other items untouched', () => {
    const state = createInitialState()
    const withA = toggleItem(state, 'a')
    const withAB = toggleItem(withA, 'b')
    expect(withAB.checked).toHaveProperty('a')
    expect(withAB.checked).toHaveProperty('b')
  })
})

describe('setNote', () => {
  it('stores a note for an id', () => {
    const state = createInitialState()
    const next = setNote(state, 'm2.motors.practice', 'gripper slipped, added rubber bands')
    expect(next.notes['m2.motors.practice']).toBe('gripper slipped, added rubber bands')
  })

  it('removes the note when set to an empty string', () => {
    const state = setNote(createInitialState(), 'a', 'something')
    const cleared = setNote(state, 'a', '   ')
    expect(cleared.notes).not.toHaveProperty('a')
  })
})

describe('toggleBookmark', () => {
  it('toggles a resource bookmark on and off', () => {
    const state = createInitialState()
    const on = toggleBookmark(state, 'falstad')
    expect(on.bookmarks.falstad).toBe(true)
    const off = toggleBookmark(on, 'falstad')
    expect(off.bookmarks).not.toHaveProperty('falstad')
  })
})

describe('setDirection', () => {
  it('sets the chosen career direction', () => {
    const state = createInitialState()
    const next = setDirection(state, 2)
    expect(next.direction).toBe(2)
  })
})

describe('markBadgeSeen', () => {
  it('records a badge as seen', () => {
    const state = createInitialState()
    const next = markBadgeSeen(state, 'first-light')
    expect(next.seenBadgeIds).toHaveProperty('first-light', true)
  })

  it('is idempotent — marking an already-seen badge returns the same state reference', () => {
    const state = markBadgeSeen(createInitialState(), 'first-light')
    const again = markBadgeSeen(state, 'first-light')
    expect(again).toBe(state)
  })

  it('leaves other seen badges untouched', () => {
    const state = markBadgeSeen(markBadgeSeen(createInitialState(), 'a'), 'b')
    expect(state.seenBadgeIds).toEqual({ a: true, b: true })
  })
})
