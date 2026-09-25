import { createInitialState, parseProgressState, type ProgressState } from './schema'

export const STORAGE_KEY = 'learn-robotics:progress:v1'

/** DOMException (thrown for a full quota) isn't always `instanceof Error` across engines, so check both. */
function getStorageErrorMessage(error: unknown): string {
  if (error instanceof DOMException || error instanceof Error) return error.message
  return 'This browser blocked saving your progress.'
}

/**
 * Reads progress from localStorage. Falls back to a fresh state on any
 * missing, malformed, or invalid data rather than throwing — a corrupt
 * value in storage should never crash the app.
 */
export function loadProgress(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return createInitialState()
    const parsed = JSON.parse(raw)
    const result = parseProgressState(parsed)
    return result.success && result.state ? result.state : createInitialState()
  } catch {
    return createInitialState()
  }
}

export interface SaveResult {
  success: boolean
  error?: string
}

/**
 * Writes progress to localStorage. Never throws — a full quota (QuotaExceededError)
 * or a browser that blocks storage (e.g. Safari private mode) is reported back
 * instead of crashing the render that triggered it.
 */
export function saveProgress(state: ProgressState): SaveResult {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return { success: true }
  } catch (error: unknown) {
    return { success: false, error: getStorageErrorMessage(error) }
  }
}

export interface ImportResult {
  success: boolean
  state?: ProgressState
  error?: string
}

/** Validates a file the user is importing. Never mutates current state on failure. */
export function importProgress(raw: string): ImportResult {
  try {
    const parsed = JSON.parse(raw)
    const result = parseProgressState(parsed)
    if (!result.success || !result.state) {
      return { success: false, error: result.error ?? 'That file is not a valid progress export.' }
    }
    return { success: true, state: result.state }
  } catch {
    return { success: false, error: 'That file is not valid JSON.' }
  }
}

export function exportProgress(state: ProgressState): string {
  return JSON.stringify(state, null, 2)
}
