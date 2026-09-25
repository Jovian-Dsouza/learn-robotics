import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { intro, months } from '@/content'
import { SchematicTimeline } from '@/components/roadmap/SchematicTimeline'
import { Card, Designator } from '@/components/ui/Card'
import { Static3DFallback } from '@/components/three/Static3DFallback'
import { useCanRender3D } from '@/components/three/useCanRender3D'
import { useProgress } from '@/progress/useProgress'
import { overallPercent } from '@/progress/selectors'

const HeroScene = lazy(() => import('@/components/three/HeroScene'))

export function Home() {
  const { progress } = useProgress()
  const percent = overallPercent(months, progress)
  // Checked before the lazy import ever fires, so a reduced-motion or
  // no-WebGL visitor never downloads the three.js chunk just to see the
  // fallback it was always going to render.
  const canRender3D = useCanRender3D()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="max-w-3xl">
          <Designator>PROJECT · SIX-MONTH ROADMAP</Designator>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] text-ink sm:text-6xl">
            Go build something <span className="text-accent italic">that moves</span>.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
            A project-first path into robotics engineering: electronics and tools, motors and sensors, CAD and
            manufacturing, ROS 2 and simulation, the maths underneath, and modern robot learning. Every section ends
            with something you have to build.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to={percent > 0 ? '/dashboard' : '/month/electronics-and-tools'}
              className="rounded-md bg-accent px-4 py-2.5 font-mono text-sm font-medium text-accent-ink transition-transform hover:scale-[1.02]"
            >
              {percent > 0 ? 'Resume where you left off' : 'Start Month 1 →'}
            </Link>
            <Link to="/directions" className="font-mono text-sm text-ink-muted underline decoration-dotted hover:text-ink">
              See the three career directions
            </Link>
          </div>
        </div>
        <div>
          {canRender3D ? (
            <Suspense fallback={<Static3DFallback height={360} />}>
              <HeroScene assemblyProgress={percent / 100} />
            </Suspense>
          ) : (
            <Static3DFallback height={360} />
          )}
          <p className="mt-2 text-center font-mono text-[0.65rem] text-ink-faint">
            this arm assembles itself as your overall progress rises
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">Why robotics, not AI engineering</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {intro.whyRobotics.map((point, i) => (
            <Card key={i} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <p className="text-sm leading-relaxed text-ink">{point}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">What a robotics engineer actually does</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          The job splits into specialisms — pick one and stay literate in the rest.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {intro.specialisms.map((s) => (
            <span key={s.id} className="rounded-full border border-line bg-bg-raised px-3 py-1.5 font-mono text-xs text-ink-muted">
              {s.name}
            </span>
          ))}
        </div>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {intro.jobRequirements.map((r) => (
            <div key={r.id} className="flex items-start gap-2 text-sm text-ink">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {r.label}
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">{intro.commitment}</p>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">The six-month schematic</h2>
          <Link to="/dashboard" className="font-mono text-xs text-accent hover:underline">
            Full dashboard →
          </Link>
        </div>
        <div className="mt-4">
          <SchematicTimeline months={months} />
        </div>
      </section>
    </div>
  )
}
