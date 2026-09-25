import type { CelebratingBadge } from './useBadgeCelebration'

interface CelebrationToastProps {
  badge: CelebratingBadge | null
  onDismiss: () => void
}

export function CelebrationToast({ badge, onDismiss }: CelebrationToastProps) {
  if (!badge) return null

  return (
    <div role="status" aria-live="polite" className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:justify-end sm:pr-6">
      <div className="flex max-w-sm animate-fade-up items-start gap-3 rounded-lg border border-done/40 bg-card px-4 py-3 shadow-lg shadow-black/40">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-done text-done" aria-hidden="true">
          ✓
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-done">Badge unlocked</p>
          <p className="text-sm font-medium text-ink">{badge.title}</p>
          <p className="mt-0.5 text-xs text-ink-muted">{badge.description}</p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="ml-auto shrink-0 text-ink-faint hover:text-ink-muted"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
