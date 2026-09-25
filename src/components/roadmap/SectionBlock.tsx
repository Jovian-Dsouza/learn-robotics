import type { Bom, Subsection } from '@/content/types'
import { Checkbox } from '@/components/ui/Checkbox'
import { Card, Designator } from '@/components/ui/Card'
import { Callout } from '@/components/ui/Callout'
import { DataTable } from '@/components/ui/DataTable'
import { useProgress } from '@/progress/useProgress'
import { ResourceCard } from './ResourceCard'
import { PracticeTask } from './PracticeTask'

function BomTable({ bom }: { bom: Bom }) {
  return (
    <div>
      <p className="mb-1.5 flex items-baseline justify-between font-mono text-xs text-ink-muted">
        <span>{bom.label}</span>
        <span className="text-accent">{bom.totalCost}</span>
      </p>
      <DataTable
        keyFor={(_line, i) => `${bom.id}-${i}`}
        columns={[
          { header: 'Part', cell: (line) => line.part },
          { header: 'Cost', cell: (line) => line.cost, className: 'px-3 py-2 text-right text-accent' },
        ]}
        rows={bom.lines}
      />
    </div>
  )
}

export function SectionBlock({ monthNumber, section, index }: { monthNumber: number; section: Subsection; index: number }) {
  const { isChecked, toggle } = useProgress()

  return (
    <section id={section.id} className="scroll-mt-24 space-y-4">
      <div>
        <Designator>
          M{monthNumber}.{index + 1}
        </Designator>
        <h3 className="mt-1 font-display text-2xl text-ink sm:text-3xl">{section.title}</h3>
        {section.intro && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">{section.intro}</p>}
      </div>

      {section.decisionFramework && (
        <Card>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-ink-muted">{section.decisionFramework.title}</p>
          <dl className="mt-2 space-y-2">
            {section.decisionFramework.options.map((opt) => (
              <div key={opt.option} className="border-l-2 border-accent/40 pl-3">
                <dt className="text-sm font-medium text-ink">{opt.option}</dt>
                <dd className="text-sm text-ink-muted">{opt.detail}</dd>
              </div>
            ))}
          </dl>
        </Card>
      )}

      {section.priceTiers && (
        <div className="grid gap-2 sm:grid-cols-2">
          {section.priceTiers.map((tier) => (
            <Card key={tier.id} className="p-3">
              <p className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">{tier.label}</span>
                <span className="font-mono text-sm text-accent">{tier.cost}</span>
              </p>
              <p className="mt-1 text-sm text-ink-muted">{tier.contents}</p>
            </Card>
          ))}
        </div>
      )}

      {section.resources && section.resources.length > 0 && (
        <div className="space-y-2">
          {section.resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      {section.callouts?.map((callout) => <Callout key={callout.id} callout={callout} />)}

      {section.notes?.map((note, i) => (
        <p key={i} className="text-sm leading-relaxed text-ink-muted">
          {note}
        </p>
      ))}

      {section.boms && section.boms.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {section.boms.map((bom) => (
            <BomTable key={bom.id} bom={bom} />
          ))}
        </div>
      )}

      {section.focusPoints && section.focusPoints.length > 0 && (
        <Card className="bg-bg-raised/40">
          <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-wider text-ink-muted">Focus on</p>
          <div className="space-y-0.5">
            {section.focusPoints.map((focus) => (
              <Checkbox key={focus.id} id={focus.id} checked={isChecked(focus.id)} onChange={() => toggle(focus.id)}>
                {focus.label}
              </Checkbox>
            ))}
          </div>
        </Card>
      )}

      {section.practiceTask && <PracticeTask task={section.practiceTask} />}
    </section>
  )
}
