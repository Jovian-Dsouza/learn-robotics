import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { ProgressProvider } from './ProgressProvider'
import { useProgress } from './useProgress'
import { STORAGE_KEY } from './storage'

function wrapper({ children }: { children: ReactNode }) {
  return <ProgressProvider>{children}</ProgressProvider>
}

describe('ProgressProvider / useProgress', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('throws when used outside a provider', () => {
    expect(() => renderHook(() => useProgress())).toThrow(/must be used within a ProgressProvider/)
  })

  it('starts from a fresh, unchecked state', () => {
    const { result } = renderHook(() => useProgress(), { wrapper })
    expect(result.current.isChecked('m1.electronics.practice')).toBe(false)
  })

  it('toggles an item and persists it to localStorage', () => {
    const { result } = renderHook(() => useProgress(), { wrapper })
    act(() => result.current.toggle('m1.electronics.practice'))
    expect(result.current.isChecked('m1.electronics.practice')).toBe(true)

    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
    expect(saved.checked).toHaveProperty('m1.electronics.practice')
  })

  it('untoggling removes the item', () => {
    const { result } = renderHook(() => useProgress(), { wrapper })
    act(() => result.current.toggle('a'))
    act(() => result.current.toggle('a'))
    expect(result.current.isChecked('a')).toBe(false)
  })

  it('reads and writes build-log notes', () => {
    const { result } = renderHook(() => useProgress(), { wrapper })
    act(() => result.current.updateNote('m2.motors.practice', 'gripper slipped, added rubber bands'))
    expect(result.current.getNote('m2.motors.practice')).toBe('gripper slipped, added rubber bands')
  })

  it('toggles a resource bookmark', () => {
    const { result } = renderHook(() => useProgress(), { wrapper })
    expect(result.current.isBookmarked('falstad')).toBe(false)
    act(() => result.current.toggleResourceBookmark('falstad'))
    expect(result.current.isBookmarked('falstad')).toBe(true)
  })

  it('sets the chosen career direction', () => {
    const { result } = renderHook(() => useProgress(), { wrapper })
    act(() => result.current.chooseDirection(2))
    expect(result.current.progress.direction).toBe(2)
  })

  it('exports and re-imports the current state', () => {
    const { result } = renderHook(() => useProgress(), { wrapper })
    act(() => result.current.toggle('a'))
    const json = result.current.exportJson()

    act(() => result.current.reset())
    expect(result.current.isChecked('a')).toBe(false)

    act(() => {
      const outcome = result.current.importJson(json)
      expect(outcome.success).toBe(true)
    })
    expect(result.current.isChecked('a')).toBe(true)
  })

  it('rejects an invalid import and leaves current state untouched', () => {
    const { result } = renderHook(() => useProgress(), { wrapper })
    act(() => result.current.toggle('a'))

    act(() => {
      const outcome = result.current.importJson('not json')
      expect(outcome.success).toBe(false)
      expect(outcome.error).toBeTruthy()
    })
    expect(result.current.isChecked('a')).toBe(true)
  })

  it('surfaces a failed write as saveError instead of crashing, and clears it once a write succeeds', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('The quota has been exceeded.', 'QuotaExceededError')
    })
    const { result } = renderHook(() => useProgress(), { wrapper })
    act(() => result.current.toggle('a'))
    expect(result.current.saveError).toMatch(/quota/i)

    setItemSpy.mockRestore()
    act(() => result.current.toggle('b'))
    expect(result.current.saveError).toBeNull()
  })

  it('reset clears checked items, notes, bookmarks, and direction', () => {
    const { result } = renderHook(() => useProgress(), { wrapper })
    act(() => {
      result.current.toggle('a')
      result.current.updateNote('a', 'note')
      result.current.toggleResourceBookmark('r')
      result.current.chooseDirection(1)
    })
    act(() => result.current.reset())
    expect(result.current.progress.checked).toEqual({})
    expect(result.current.progress.notes).toEqual({})
    expect(result.current.progress.bookmarks).toEqual({})
    expect(result.current.progress.direction).toBeNull()
  })
})
