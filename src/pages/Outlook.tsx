import { outlook } from '@/content/outlook'
import { Card, Designator } from '@/components/ui/Card'
import { DataTable } from '@/components/ui/DataTable'

export function Outlook() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Designator>THE HONEST VERSION</Designator>
      <h1 className="mt-2 font-display text-4xl text-ink">What to expect after six months</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">{outlook.headline}</p>

      <section className="mt-10">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">The capital is real</p>
        <ul className="mt-2 space-y-1.5 text-sm text-ink">
          {outlook.capitalStats.map((s, i) => (
            <li key={i}>· {s}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">But hiring is lagging the capital</p>
        <ul className="mt-2 space-y-1.5 text-sm text-ink">
          {outlook.hiringReality.map((s, i) => (
            <li key={i}>· {s}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">What it pays</p>
        <div className="mt-3">
          <DataTable
            keyFor={(row) => row.id}
            columns={[
              { header: 'Level', cell: (row) => row.label },
              { header: 'Range', cell: (row) => row.value, className: 'px-3 py-2 text-accent' },
              { header: 'Source', cell: (row) => row.source, className: 'px-3 py-2 text-ink-muted' },
            ]}
            rows={outlook.pay}
          />
        </div>
      </section>

      <section className="mt-10">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">Freelance and contract</p>
        <ul className="mt-2 space-y-1.5 text-sm text-ink">
          {outlook.freelance.map((s, i) => (
            <li key={i}>· {s}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">Entry points that need no degree</p>
        <ul className="mt-2 space-y-1.5 text-sm text-ink">
          {outlook.entryPoints.map((s, i) => (
            <li key={i}>· {s}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">Take away</p>
        <div className="mt-3 space-y-3">
          {outlook.takeaways.map((t) => (
            <Card key={t.id}>
              <h2 className="font-display text-lg text-ink">{t.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t.body}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
