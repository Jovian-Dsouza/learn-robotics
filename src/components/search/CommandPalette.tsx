import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { months } from '@/content'
import { buildSearchIndex } from '@/search'
import { groupByKind, searchItems } from '@/search/search'
import { SEARCH_KIND_LABELS } from '@/search/types'
import { cn } from '@/lib/cn'

const SEARCH_INDEX = buildSearchIndex(months)

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const groups = useMemo(() => groupByKind(searchItems(SEARCH_INDEX, query)), [query])
  const flatResults = useMemo(() => groups.flatMap((group) => group.items), [groups])

  // Adjusting state during render (React's own recommended pattern for
  // "reset local state when a prop/derived value changes") rather than in an
  // effect — it skips an extra commit and isn't cascading-render-prone the
  // way a setState-in-effect is.
  const [prevOpen, setPrevOpen] = useState(open)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setQuery('')
      setActiveIndex(0)
    }
  }

  const [prevQuery, setPrevQuery] = useState(query)
  if (query !== prevQuery) {
    setPrevQuery(query)
    setActiveIndex(0)
  }

  // Focusing an element is a genuine external-system side effect, so this one stays a real effect.
  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  function go(url: string) {
    navigate(url)
    onClose()
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (event.key === 'Enter') {
      const target = flatResults[activeIndex]
      if (target) go(target.url)
    }
  }

  if (!open) return null

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-start justify-center bg-bg/80 px-4 pt-24 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the roadmap"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-lg border border-line bg-card shadow-2xl shadow-black/60"
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" className="shrink-0 text-ink-faint" aria-hidden="true">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search topics, resources, milestones…"
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            aria-label="Search"
          />
          <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[0.65rem] text-ink-faint sm:inline">
            Esc
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' && (
            <p className="px-3 py-8 text-center text-sm text-ink-muted">Start typing to search the whole roadmap.</p>
          )}
          {query.trim() !== '' && flatResults.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-ink-muted">No matches for "{query}".</p>
          )}
          {groups.map((group) => (
            <div key={group.kind} className="mb-2 last:mb-0">
              <p className="px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-ink-faint">
                {SEARCH_KIND_LABELS[group.kind]}
              </p>
              {group.items.map((item) => {
                const index = flatResults.indexOf(item)
                const active = index === activeIndex
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => go(item.url)}
                    className={cn(
                      'flex w-full flex-col items-start gap-0.5 rounded-md px-3 py-2 text-left transition-colors',
                      active ? 'bg-accent-soft' : 'hover:bg-bg-raised',
                    )}
                  >
                    <span className={cn('text-sm', active ? 'text-accent' : 'text-ink')}>{item.title}</span>
                    <span className="line-clamp-1 text-xs text-ink-muted">{item.subtitle}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
