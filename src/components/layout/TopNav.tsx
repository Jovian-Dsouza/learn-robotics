import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { LevelBadge } from '@/components/gamification/LevelBadge'

const LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/directions', label: 'Directions' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/outlook', label: 'Outlook' },
  { to: '/resources', label: 'Resources' },
]

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" aria-label="Bench Notebook — home" className="flex items-center gap-2 font-display text-lg tracking-tight text-ink">
          <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-sm border border-accent/50 text-accent">
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
              <path d="M2 8h2l1-3 2 6 2-6 1 3h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="hidden sm:inline">Bench Notebook</span>
        </NavLink>
        <nav className="ml-auto flex items-center gap-1 overflow-x-auto font-mono text-xs uppercase tracking-wider">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'whitespace-nowrap rounded-sm px-2.5 py-1.5 transition-colors',
                  isActive ? 'bg-accent-soft text-accent' : 'text-ink-muted hover:text-ink',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <LevelBadge variant="compact" className="hidden shrink-0 border-l border-line pl-4 sm:flex" />
      </div>
    </header>
  )
}
