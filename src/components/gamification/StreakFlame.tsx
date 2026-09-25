import { useProgress } from '@/progress/useProgress'
import { computeStreak } from '@/gamification/streak'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/cn'

/** A small inline spark glyph — original, not a downloaded icon — colored active/inactive by streak state. */
function SparkIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M8 1.5c-.6 3-3 3.6-3 6.3a3 3 0 1 0 6 0c0-.9-.4-1.5-.8-2 .2 1.2-.5 1.8-1 1.8.6-2-.3-4-1.2-6.1Z"
        fill={active ? 'var(--color-accent)' : 'none'}
        stroke={active ? 'var(--color-accent)' : 'var(--color-ink-faint)'}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function StreakFlame({ className }: { className?: string }) {
  const { progress } = useProgress()
  const { current, longest } = computeStreak(progress)

  return (
    <Card className={cn('flex items-center gap-4', className)}>
      <div className="flex items-center gap-2">
        <SparkIcon active={current > 0} />
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">Current streak</p>
          <p className="font-display text-2xl text-ink">
            {current} <span className="text-sm font-normal text-ink-muted">day{current === 1 ? '' : 's'}</span>
          </p>
        </div>
      </div>
      <div className="ml-auto text-right">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">Longest</p>
        <p className="font-mono text-sm text-ink">{longest}d</p>
      </div>
    </Card>
  )
}
