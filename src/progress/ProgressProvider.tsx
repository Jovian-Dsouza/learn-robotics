import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { months } from '@/content'
import { unlockedBadgeIds } from '@/gamification/badges'
import { createInitialState, type Direction, type ProgressState } from './schema'
import { markBadgeSeen as markBadgeSeenInStore, setDirection, setNote, toggleBookmark, toggleItem } from './store'
import { exportProgress, importProgress, loadProgress, saveProgress } from './storage'
import { ProgressContext, type ProgressContextValue } from './context'

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress())
  const [saveError, setSaveError] = useState<string | null>(null)

  // This effect synchronizes React state with an external system (localStorage) —
  // the setState call below is reporting that write's outcome, not deriving
  // local render state, so it's exempt from the usual "don't setState in an
  // effect" guidance.
  useEffect(() => {
    const result = saveProgress(progress)
    setSaveError(result.success ? null : (result.error ?? 'Could not save progress.'))
  }, [progress])

  const isChecked = useCallback((id: string) => id in progress.checked, [progress.checked])
  const toggle = useCallback((id: string) => setProgress((prev) => toggleItem(prev, id)), [])
  const getNote = useCallback((id: string) => progress.notes[id] ?? '', [progress.notes])
  const updateNote = useCallback((id: string, note: string) => setProgress((prev) => setNote(prev, id, note)), [])
  const isBookmarked = useCallback((id: string) => id in progress.bookmarks, [progress.bookmarks])
  const toggleResourceBookmark = useCallback((id: string) => setProgress((prev) => toggleBookmark(prev, id)), [])
  const chooseDirection = useCallback((direction: Direction) => setProgress((prev) => setDirection(prev, direction)), [])
  const newlyUnlockedBadges = useMemo(
    () => unlockedBadgeIds(months, progress).filter((id) => !(id in progress.seenBadgeIds)),
    [progress],
  )
  const markBadgeSeen = useCallback((badgeId: string) => setProgress((prev) => markBadgeSeenInStore(prev, badgeId)), [])
  const exportJson = useCallback(() => exportProgress(progress), [progress])
  const importJson = useCallback((raw: string) => {
    const result = importProgress(raw)
    if (result.success && result.state) {
      setProgress(result.state)
      return { success: true }
    }
    return { success: false, error: result.error }
  }, [])
  const reset = useCallback(() => setProgress(createInitialState()), [])

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      saveError,
      isChecked,
      toggle,
      getNote,
      updateNote,
      isBookmarked,
      toggleResourceBookmark,
      chooseDirection,
      newlyUnlockedBadges,
      markBadgeSeen,
      exportJson,
      importJson,
      reset,
    }),
    [
      progress,
      saveError,
      isChecked,
      toggle,
      getNote,
      updateNote,
      isBookmarked,
      toggleResourceBookmark,
      chooseDirection,
      newlyUnlockedBadges,
      markBadgeSeen,
      exportJson,
      importJson,
      reset,
    ],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
