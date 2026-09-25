import { portfolio } from '@/content/portfolio'
import { Card, Designator } from '@/components/ui/Card'
import { Checkbox } from '@/components/ui/Checkbox'
import { PracticeTask } from '@/components/roadmap/PracticeTask'
import { useProgress } from '@/progress/useProgress'

export function Portfolio() {
  const { isChecked, toggle } = useProgress()

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Designator>WHAT RECRUITERS ACTUALLY SCREEN FOR</Designator>
      <h1 className="mt-2 font-display text-4xl text-ink">Your portfolio</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card className="border-done/30">
          <p className="font-mono text-xs uppercase tracking-wider text-done">High signal</p>
          <ul className="mt-3 space-y-2">
            {portfolio.highSignal.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-done" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-accent/30">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">Red flags</p>
          <ul className="mt-3 space-y-2">
            {portfolio.redFlags.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <section className="mt-10">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">README checklist — for each project</p>
        <Card className="mt-3">
          <div className="space-y-0.5">
            {portfolio.readmeChecklist.map((item) => (
              <Checkbox key={item.id} id={item.id} checked={isChecked(item.id)} onChange={() => toggle(item.id)}>
                {item.label}
              </Checkbox>
            ))}
          </div>
        </Card>
        <div className="mt-3">
          <PracticeTask task={portfolio.practiceTask} />
        </div>
      </section>

      <section className="mt-10">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">Interviews</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Robotics interviews are not software interviews — leetcode is a much weaker predictor here.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">Expect</p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink">
              {portfolio.interview.topics.map((t, i) => (
                <li key={i}>· {t}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">At good companies, also expect</p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink">
              {portfolio.interview.goodCompanyExpect.map((t, i) => (
                <li key={i}>· {t}</li>
              ))}
            </ul>
          </Card>
        </div>
        <p className="mt-4 text-xs text-ink-faint">{portfolio.interview.glassdoorNote}</p>
        <div className="mt-4">
          <PracticeTask task={portfolio.interview.practiceTask} />
        </div>
      </section>
    </div>
  )
}
