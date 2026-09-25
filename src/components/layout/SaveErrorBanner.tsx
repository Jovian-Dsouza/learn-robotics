import { useProgress } from '@/progress/useProgress'

/** Surfaces a failed localStorage write (full quota, private-mode restriction) instead of failing silently. */
export function SaveErrorBanner() {
  const { saveError } = useProgress()
  if (!saveError) return null

  return (
    <div role="alert" className="border-b border-accent/40 bg-accent-soft px-4 py-2 text-center font-mono text-xs text-accent sm:px-6">
      Couldn&apos;t save your progress in this browser ({saveError}). Export a backup from the Dashboard once
      storage is available again.
    </div>
  )
}
