import type { Month } from '@/content/types'
import type { ProgressState } from '@/progress/schema'
import { isMonthComplete, monthPercent, overallPercent } from '@/progress/selectors'

interface CircuitTraceProps {
  months: Month[]
  progress: ProgressState
}

/**
 * A PCB-trace-styled progress strip: a single line running through six nodes
 * (one per month), lit up proportional to overall progress. `pathLength="100"`
 * normalizes the SVG path to 100 units so the dash math is a plain percentage,
 * no runtime measurement needed.
 */
export function CircuitTrace({ months, progress }: CircuitTraceProps) {
  const percent = overallPercent(months, progress)
  const count = Math.max(months.length, 1)
  const nodeXs = months.map((_, i) => 20 + (i * 560) / Math.max(count - 1, 1))

  return (
    <svg viewBox="0 0 600 40" className="h-8 w-full" role="img" aria-label={`Overall roadmap progress: ${percent}%`}>
      <path d="M20,20 L580,20" pathLength={100} stroke="var(--color-line)" strokeWidth="2" fill="none" />
      <path
        d="M20,20 L580,20"
        pathLength={100}
        stroke="var(--color-accent)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={100}
        strokeDashoffset={100 - percent}
        className="transition-[stroke-dashoffset] duration-700 ease-out"
      />
      {months.map((month, i) => {
        const complete = isMonthComplete(month, progress)
        const started = monthPercent(month, progress) > 0
        return (
          <circle
            key={month.id}
            cx={nodeXs[i]}
            cy={20}
            r={complete ? 7 : 5}
            fill={complete ? 'var(--color-done)' : started ? 'var(--color-accent)' : 'var(--color-bg-raised)'}
            stroke={complete ? 'var(--color-done)' : started ? 'var(--color-accent)' : 'var(--color-ink-faint)'}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
        )
      })}
    </svg>
  )
}
