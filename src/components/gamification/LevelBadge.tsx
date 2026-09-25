import { months } from '@/content'
import { useProgress } from '@/progress/useProgress'
import { levelForXp, levelTitle, totalXp, xpRangeForLevel } from '@/gamification/xp'
import { cn } from '@/lib/cn'

interface LevelBadgeProps {
  variant?: 'compact' | 'full'
  className?: string
}

export function LevelBadge({ variant = 'full', className }: LevelBadgeProps) {
  const { progress } = useProgress()
  const xp = totalXp(months, progress)
  const level = levelForXp(xp)
  const title = levelTitle(level)
  const { min, max } = xpRangeForLevel(level)
  const levelPercent = max > min ? Math.round(((xp - min) / (max - min)) * 100) : 100

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2 font-mono text-xs text-ink-muted', className)}>
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-accent/50 text-[0.6rem] text-accent">
          {level}
        </span>
        <span className="hidden md:inline">{title}</span>
        <span className="h-1.5 w-14 overflow-hidden rounded-full bg-bg-raised">
          <span className="block h-full bg-accent transition-all duration-500" style={{ width: `${levelPercent}%` }} />
        </span>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-accent/60 font-mono text-xl text-accent">
        {level}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-lg text-ink">{title}</p>
        <p className="font-mono text-xs text-ink-muted">
          {xp} XP · {max - xp} to level {level + 1}
        </p>
        <span className="mt-1.5 block h-2 w-full overflow-hidden rounded-full bg-bg-raised">
          <span className="block h-full bg-accent transition-all duration-500" style={{ width: `${levelPercent}%` }} />
        </span>
      </div>
    </div>
  )
}
