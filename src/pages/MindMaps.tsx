import { useState } from 'react'
import { months } from '@/content'
import { Designator } from '@/components/ui/Card'
import { MindMapDiagram } from '@/components/mindmap/MindMapDiagram'
import { useProgress } from '@/progress/useProgress'
import { cn } from '@/lib/cn'

export function MindMaps() {
  const { progress } = useProgress()
  const [selected, setSelected] = useState(months[0].number)
  const month = months.find((m) => m.number === selected) ?? months[0]

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Designator>EACH MONTH, AS A MAP</Designator>
      <h1 className="mt-2 font-display text-4xl text-ink">Mind Maps</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
        Every month's sections, focus points, practice tasks, and milestones as one diagram. Green means checked off —
        click any node to jump straight to it.
      </p>

      <div className="mt-6 flex flex-wrap gap-1.5" role="tablist" aria-label="Choose a month">
        {months.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={m.number === selected}
            onClick={() => setSelected(m.number)}
            className={cn(
              'rounded-full border px-3 py-1.5 font-mono text-xs transition-colors',
              m.number === selected ? 'border-accent bg-accent-soft text-accent' : 'border-line text-ink-muted hover:text-ink',
            )}
          >
            M{m.number} · {m.title.split(',')[0]}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-line bg-card/60 p-4">
        <MindMapDiagram month={month} progress={progress} />
      </div>
    </div>
  )
}
