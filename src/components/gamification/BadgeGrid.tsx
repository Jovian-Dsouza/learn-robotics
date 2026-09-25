import { months } from '@/content'
import { useProgress } from '@/progress/useProgress'
import { evaluateBadges } from '@/gamification/badges'
import { cn } from '@/lib/cn'

export function BadgeGrid() {
  const { progress } = useProgress()
  const badges = evaluateBadges(months, progress)

  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className={cn(
            'rounded-md border p-3 transition-colors',
            badge.unlocked ? 'border-done/40 bg-done-soft' : 'border-line bg-bg-raised/40 opacity-60',
          )}
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs',
                badge.unlocked ? 'border-done text-done' : 'border-ink-faint text-ink-faint',
              )}
              aria-hidden="true"
            >
              {badge.unlocked ? '✓' : '·'}
            </span>
            <p className={cn('text-sm font-medium', badge.unlocked ? 'text-ink' : 'text-ink-muted')}>{badge.title}</p>
          </div>
          <p className="mt-1.5 text-xs text-ink-muted">{badge.description}</p>
        </div>
      ))}
    </div>
  )
}
