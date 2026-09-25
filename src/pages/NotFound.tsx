import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">Signal lost</p>
      <h1 className="mt-2 font-display text-4xl text-ink">This page doesn&apos;t exist yet.</h1>
      <p className="mt-3 text-sm text-ink-muted">Check the wiring, or head back to the roadmap.</p>
      <Link to="/" className="mt-6 rounded-md border border-line px-3 py-2 font-mono text-xs text-ink hover:border-accent/50 hover:text-accent">
        ← Back home
      </Link>
    </div>
  )
}
