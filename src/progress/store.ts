import { MAX_NOTE_LENGTH, type Direction, type ProgressState } from './schema'

/**
 * Pure, immutable updates to ProgressState. Every function returns a new
 * object — callers (the ProgressProvider) never see the input mutated.
 */

export function toggleItem(state: ProgressState, id: string, now: () => string = () => new Date().toISOString()): ProgressState {
  const isChecked = id in state.checked
  const checked = { ...state.checked }
  if (isChecked) {
    delete checked[id]
  } else {
    checked[id] = now()
  }
  return { ...state, checked }
}

export function setNote(state: ProgressState, id: string, note: string): ProgressState {
  const notes = { ...state.notes }
  if (note.trim() === '') {
    delete notes[id]
  } else {
    notes[id] = note.slice(0, MAX_NOTE_LENGTH)
  }
  return { ...state, notes }
}

export function toggleBookmark(state: ProgressState, id: string): ProgressState {
  const isBookmarked = id in state.bookmarks
  const bookmarks = { ...state.bookmarks }
  if (isBookmarked) {
    delete bookmarks[id]
  } else {
    bookmarks[id] = true
  }
  return { ...state, bookmarks }
}

export function setDirection(state: ProgressState, direction: Direction): ProgressState {
  return { ...state, direction }
}

/** Records that a badge's unlock celebration has been shown, so it never replays on reload. */
export function markBadgeSeen(state: ProgressState, badgeId: string): ProgressState {
  if (badgeId in state.seenBadgeIds) return state
  return { ...state, seenBadgeIds: { ...state.seenBadgeIds, [badgeId]: true } }
}
