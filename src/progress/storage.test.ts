import { beforeEach, describe, expect, it, vi } from 'vitest'
import { toggleItem } from './store'
import { createInitialState, PROGRESS_VERSION } from './schema'
import { exportProgress, importProgress, loadProgress, saveProgress, STORAGE_KEY } from './storage'

describe('loadProgress / saveProgress', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns a fresh state when nothing is stored', () => {
    const state = loadProgress()
    expect(state.version).toBe(PROGRESS_VERSION)
    expect(state.checked).toEqual({})
  })

  it('round-trips a saved state', () => {
    const state = toggleItem(createInitialState(), 'm1.electronics.practice')
    saveProgress(state)
    const loaded = loadProgress()
    expect(loaded.checked).toHaveProperty('m1.electronics.practice')
  })

  it('falls back to a fresh state on corrupt JSON rather than throwing', () => {
    window.localStorage.setItem(STORAGE_KEY, '{not json')
    expect(() => loadProgress()).not.toThrow()
    expect(loadProgress().version).toBe(PROGRESS_VERSION)
  })

  it('falls back to a fresh state on a validly-parsed but invalid shape', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ foo: 'bar' }))
    expect(loadProgress().checked).toEqual({})
  })

  it('reports a failed write instead of throwing (e.g. a full quota or private-mode restriction)', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('The quota has been exceeded.', 'QuotaExceededError')
    })
    const result = saveProgress(createInitialState())
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/quota/i)
    setItemSpy.mockRestore()
  })
})

describe('importProgress / exportProgress', () => {
  it('exports a state that can be re-imported', () => {
    const state = toggleItem(createInitialState(), 'a')
    const json = exportProgress(state)
    const result = importProgress(json)
    expect(result.success).toBe(true)
    expect(result.state?.checked).toHaveProperty('a')
  })

  it('rejects malformed JSON with a friendly error, and returns no state', () => {
    const result = importProgress('not json at all')
    expect(result.success).toBe(false)
    expect(result.state).toBeUndefined()
    expect(result.error).toMatch(/not valid JSON/i)
  })

  it('rejects well-formed JSON that is not a valid progress export', () => {
    const result = importProgress(JSON.stringify({ hello: 'world' }))
    expect(result.success).toBe(false)
    expect(result.error).toBeTruthy()
  })
})
