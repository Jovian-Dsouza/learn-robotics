import { createContext } from 'react'
import type { Direction, ProgressState } from './schema'

export interface ProgressContextValue {
  progress: ProgressState
  /** Set when the most recent write to localStorage failed (full quota, private-mode restriction). */
  saveError: string | null
  isChecked: (id: string) => boolean
  toggle: (id: string) => void
  getNote: (id: string) => string
  updateNote: (id: string, note: string) => void
  isBookmarked: (id: string) => boolean
  toggleResourceBookmark: (id: string) => void
  chooseDirection: (direction: Direction) => void
  /** Unlocked badge ids the user hasn't had celebrated yet — drives the confetti/toast in useBadgeCelebration. */
  newlyUnlockedBadges: string[]
  markBadgeSeen: (badgeId: string) => void
  exportJson: () => string
  importJson: (raw: string) => { success: boolean; error?: string }
  reset: () => void
}

export const ProgressContext = createContext<ProgressContextValue | null>(null)
