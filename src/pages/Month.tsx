import { lazy, Suspense } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getMonthBySlug, months } from '@/content'
import { Designator } from '@/components/ui/Card'
import { ProgressRing } from '@/components/ui/ProgressRing'
import { SectionBlock } from '@/components/roadmap/SectionBlock'
import { MilestoneList } from '@/components/roadmap/MilestoneList'
import { Static3DFallback } from '@/components/three/Static3DFallback'
import { useCanRender3D } from '@/components/three/useCanRender3D'
import { useProgress } from '@/progress/useProgress'
import { monthPercent } from '@/progress/selectors'

const MonthIconScene = lazy(() => import('@/components/three/MonthIconScene'))
const MONTH_ICON_SIZE = 72

export function MonthPage() {
  const { slug } = useParams<{ slug: string }>()
  const month = slug ? getMonthBySlug(slug) : undefined
  const { progress } = useProgress()
  const canRender3D = useCanRender3D()

  if (!month) return <Navigate to="/" replace />

  const percent = monthPercent(month, progress)
  const prev = months.find((m) => m.number === month.number - 1)
  const next = months.find((m) => m.number === month.number + 1)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex items-start gap-4">
        <div className="w-18 shrink-0">
          {canRender3D ? (
            <Suspense fallback={<Static3DFallback height={MONTH_ICON_SIZE} />}>
              <MonthIconScene monthNumber={month.number} height={MONTH_ICON_SIZE} />
            </Suspense>
          ) : (
            <Static3DFallback height={MONTH_ICON_SIZE} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <Designator>MONTH {month.number} OF 6</Designator>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h1 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{month.title}</h1>
            <ProgressRing percent={percent} size={56} strokeWidth={4} />
          </div>
        </div>
      </div>

      <p className="mt-4 text-lg leading-relaxed text-ink">
        <span className="font-mono text-xs uppercase tracking-wider text-accent">Goal — </span>
        {month.goal}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{month.framing}</p>

      <div className="mt-10 space-y-14">
        {month.subsections.map((section, i) => (
          <SectionBlock key={section.id} monthNumber={month.number} section={section} index={i} />
        ))}
      </div>

      <section className="mt-14 rounded-lg border border-done/30 bg-done-soft p-5">
        <Designator className="text-done">MILESTONE CHECK</Designator>
        <h2 className="mt-1 font-display text-xl text-ink">Month {month.number} milestone</h2>
        <div className="mt-3">
          <MilestoneList milestones={month.milestones} />
        </div>
      </section>

      <nav className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6 font-mono text-sm">
        {prev ? (
          <Link to={`/month/${prev.slug}`} className="text-ink-muted hover:text-accent">
            ← Month {prev.number}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/month/${next.slug}`} className="text-ink-muted hover:text-accent">
            Month {next.number} →
          </Link>
        ) : (
          <Link to="/portfolio" className="text-accent hover:underline">
            On to your portfolio →
          </Link>
        )}
      </nav>
    </div>
  )
}
