import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { months } from '@/content'
import { directions } from '@/content/directions'
import { Card, Designator } from '@/components/ui/Card'
import { ProgressRing } from '@/components/ui/ProgressRing'
import { LevelBadge } from '@/components/gamification/LevelBadge'
import { StreakFlame } from '@/components/gamification/StreakFlame'
import { BadgeGrid } from '@/components/gamification/BadgeGrid'
import { CelebrationToast } from '@/components/gamification/CelebrationToast'
import { useBadgeCelebration } from '@/components/gamification/useBadgeCelebration'
import { useProgress } from '@/progress/useProgress'
import { completedCount, monthPercent, nextUp, overallPercent } from '@/progress/selectors'

export function Dashboard() {
  const { progress, exportJson, importJson, reset } = useProgress()
  const celebration = useBadgeCelebration()
  const [importError, setImportError] = useState<string | null>(null)
  const [importMessage, setImportMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const overall = overallPercent(months, progress)
  const { done, total } = completedCount(months, progress)
  const next = nextUp(months, progress)
  const chosenDirection = directions.find((d) => d.number === progress.direction)
  const noteEntries = Object.entries(progress.notes).filter(([, note]) => note.trim() !== '')

  function handleExport() {
    const blob = new Blob([exportJson()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'learn-robotics-progress.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImportFile(file: File) {
    setImportError(null)
    setImportMessage(null)
    const reader = new FileReader()
    reader.onload = () => {
      const result = importJson(String(reader.result))
      if (result.success) {
        setImportMessage('Progress imported.')
      } else {
        setImportError(result.error ?? 'Could not import that file.')
      }
    }
    reader.onerror = () => setImportError('Could not read that file.')
    reader.readAsText(file)
  }

  function handleReset() {
    if (window.confirm('Reset all progress? This clears every checked item and build-log note in this browser.')) {
      reset()
      setImportMessage(null)
      setImportError(null)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Designator>YOUR PROGRESS</Designator>
      <h1 className="mt-2 font-display text-4xl text-ink">Dashboard</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <LevelBadge />
        </Card>
        <StreakFlame />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[auto_1fr]">
        <Card className="flex items-center gap-4">
          <ProgressRing percent={overall} size={88} />
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">Overall</p>
            <p className="font-mono text-sm text-ink">
              {done} / {total} items
            </p>
            {chosenDirection ? (
              <p className="mt-1 text-xs text-ink-muted">
                Direction: <span className="text-accent">{chosenDirection.name}</span>
              </p>
            ) : (
              <Link to="/directions" className="mt-1 inline-block text-xs text-accent hover:underline">
                Pick a career direction →
              </Link>
            )}
          </div>
        </Card>

        <Card>
          <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">Up next</p>
          {next ? (
            <Link to={`/month/${next.monthSlug}`} className="mt-2 block">
              <p className="font-mono text-xs text-accent">Month {next.monthNumber}</p>
              <p className="mt-0.5 text-sm text-ink">{next.label}</p>
            </Link>
          ) : (
            <p className="mt-2 text-sm text-done">Every tracked item is checked off. Go build something new.</p>
          )}
        </Card>
      </div>

      <section className="mt-10">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">By month</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {months.map((month) => (
            <Link
              key={month.id}
              to={`/month/${month.slug}`}
              className="flex items-center gap-3 rounded-lg border border-line bg-card/60 p-3 transition-colors hover:border-accent/40"
            >
              <ProgressRing percent={monthPercent(month, progress)} size={48} strokeWidth={4} />
              <div className="min-w-0">
                <p className="font-mono text-xs text-ink-muted">Month {month.number}</p>
                <p className="truncate text-sm text-ink">{month.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">Achievements</p>
        <div className="mt-3">
          <BadgeGrid />
        </div>
      </section>

      {noteEntries.length > 0 && (
        <section className="mt-10">
          <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">Build log</p>
          <div className="mt-3 space-y-2">
            {noteEntries.map(([id, note]) => (
              <Card key={id} className="p-3">
                <p className="font-mono text-[0.65rem] text-ink-faint">{id}</p>
                <p className="mt-1 text-sm text-ink">{note}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">Data</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="rounded-md border border-line px-3 py-2 font-mono text-xs text-ink hover:border-accent/50 hover:text-accent"
          >
            Export progress (.json)
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-md border border-line px-3 py-2 font-mono text-xs text-ink hover:border-accent/50 hover:text-accent"
          >
            Import progress
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleImportFile(file)
              e.target.value = ''
            }}
          />
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border border-line px-3 py-2 font-mono text-xs text-ink-muted hover:border-accent/50 hover:text-accent"
          >
            Reset all progress
          </button>
        </div>
        {importMessage && <p className="mt-2 font-mono text-xs text-done">{importMessage}</p>}
        {importError && <p className="mt-2 font-mono text-xs text-accent">{importError}</p>}
        <p className="mt-2 max-w-xl text-xs text-ink-faint">
          Progress lives only in this browser&apos;s local storage. Export a backup before clearing site data or
          switching devices.
        </p>
      </section>

      <CelebrationToast badge={celebration.current} onDismiss={celebration.dismiss} />
    </div>
  )
}
