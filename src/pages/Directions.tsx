import { directions } from '@/content/directions'
import { Card, Designator } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useProgress } from '@/progress/useProgress'
import { cn } from '@/lib/cn'

export function Directions() {
  const { progress, chooseDirection } = useProgress()

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Designator>MONTH 6 · PART TWO</Designator>
      <h1 className="mt-2 font-display text-4xl text-ink">Pick a direction</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
        Three directions genuinely exist in robotics. Pick one, and let the other two stay at literacy level.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {directions.map((direction) => {
          const isChosen = progress.direction === direction.number
          return (
            <Card
              key={direction.id}
              className={cn('flex flex-col gap-3', isChosen && 'border-accent bg-accent-soft')}
            >
              <div>
                <span className="font-mono text-xs text-ink-muted">Direction {direction.number}</span>
                <h2 className="mt-1 font-display text-xl text-ink">{direction.name}</h2>
              </div>
              <p className="text-sm text-ink-muted">{direction.bestFor}</p>
              <div className="flex flex-wrap gap-1.5">
                {direction.focus.map((f) => (
                  <Badge key={f} tone="neutral">
                    {f}
                  </Badge>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">{direction.detail}</p>
              <button
                type="button"
                onClick={() => chooseDirection(direction.number as 1 | 2 | 3)}
                className={cn(
                  'mt-auto rounded-md border px-3 py-2 font-mono text-xs transition-colors',
                  isChosen
                    ? 'border-accent bg-accent text-accent-ink'
                    : 'border-line text-ink-muted hover:border-accent/50 hover:text-accent',
                )}
              >
                {isChosen ? 'Chosen ✓' : 'Choose this direction'}
              </button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
