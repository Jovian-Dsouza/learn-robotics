import { Link } from 'react-router-dom'
import type { Month } from '@/content/types'
import { useProgress } from '@/progress/useProgress'
import { isMonthComplete, monthPercent } from '@/progress/selectors'
import { cn } from '@/lib/cn'
import { CircuitTrace } from './CircuitTrace'

/** The six-month roadmap as a schematic trace — each month is a node that fills as you progress. */
export function SchematicTimeline({ months }: { months: Month[] }) {
  const { progress } = useProgress()

  return (
    <div className="relative">
      <CircuitTrace months={months} progress={progress} />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {months.map((month, i) => {
          const percent = monthPercent(month, progress)
          const isComplete = isMonthComplete(month, progress)
          const isStarted = percent > 0
          return (
            <Link
              key={month.id}
              to={`/month/${month.slug}`}
              className={cn(
                'group relative flex flex-col gap-2 rounded-lg border p-4 transition-all hover:-translate-y-0.5',
                isComplete ? 'border-done/50 bg-done-soft' : isStarted ? 'border-accent/50 bg-accent-soft' : 'border-line bg-card/60',
              )}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full border font-mono text-xs',
                    isComplete
                      ? 'border-done bg-done text-bg'
                      : isStarted
                        ? 'border-accent text-accent'
                        : 'border-ink-faint text-ink-faint',
                  )}
                >
                  {isComplete ? '✓' : month.number}
                </span>
                <span className="font-mono text-xs text-ink-muted">{percent}%</span>
              </div>
              <h3 className="font-display text-lg leading-tight text-ink group-hover:text-accent">{month.title}</h3>
              <p className="line-clamp-2 text-xs text-ink-muted">{month.goal}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
