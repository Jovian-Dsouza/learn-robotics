import { describe, expect, it } from 'vitest'
import { createInitialState, migrateProgressState, parseProgressState } from './schema'

describe('createInitialState', () => {
  it('produces a valid, empty progress state', () => {
    const state = createInitialState(() => '2026-01-01T00:00:00.000Z')
    expect(state).toEqual({
      version: 2,
      checked: {},
      notes: {},
      bookmarks: {},
      seenBadgeIds: {},
      direction: null,
      startedAt: '2026-01-01T00:00:00.000Z',
    })
  })
})

describe('parseProgressState', () => {
  it('accepts a well-formed state', () => {
    const result = parseProgressState(createInitialState())
    expect(result.success).toBe(true)
  })

  it('rejects garbage input without throwing', () => {
    const result = parseProgressState({ hello: 'world' })
    expect(result.success).toBe(false)
    expect(result.error).toBeTruthy()
  })

  it('rejects null, arrays, and primitives', () => {
    expect(parseProgressState(null).success).toBe(false)
    expect(parseProgressState([1, 2, 3]).success).toBe(false)
    expect(parseProgressState('hello').success).toBe(false)
  })

  it('rejects a direction outside 1|2|3|null', () => {
    const bad = { ...createInitialState(), direction: 7 }
    expect(parseProgressState(bad).success).toBe(false)
  })

  it('rejects a genuinely future/unknown version', () => {
    const bad = { ...createInitialState(), version: 3 }
    expect(parseProgressState(bad).success).toBe(false)
  })

  it('transparently migrates a v1 export (no seenBadgeIds) and preserves existing progress', () => {
    const v1Export = {
      version: 1,
      checked: { 'm1.electronics.practice': '2026-01-01T00:00:00.000Z' },
      notes: { 'm1.electronics.practice': 'blew a fuse, fixed the wiring' },
      bookmarks: { falstad: true },
      direction: 2,
      startedAt: '2025-12-01T00:00:00.000Z',
    }
    const result = parseProgressState(v1Export)
    expect(result.success).toBe(true)
    expect(result.state?.version).toBe(2)
    expect(result.state?.seenBadgeIds).toEqual({})
    expect(result.state?.checked).toEqual(v1Export.checked)
    expect(result.state?.notes).toEqual(v1Export.notes)
    expect(result.state?.bookmarks).toEqual(v1Export.bookmarks)
    expect(result.state?.direction).toBe(2)
  })
})

describe('migrateProgressState', () => {
  it('passes non-object input through unchanged', () => {
    expect(migrateProgressState(null)).toBeNull()
    expect(migrateProgressState('hello')).toBe('hello')
    expect(migrateProgressState(42)).toBe(42)
  })

  it('passes an already-current-version object through unchanged', () => {
    const current = createInitialState()
    expect(migrateProgressState(current)).toEqual(current)
  })

  it('passes an object with an unrecognised version through unchanged (parseProgressState rejects it)', () => {
    const future = { ...createInitialState(), version: 99 }
    expect(migrateProgressState(future)).toEqual(future)
  })
})
