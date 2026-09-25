import { useMemo, useState } from 'react'
import { allResources, months } from '@/content'
import { Designator } from '@/components/ui/Card'
import { ResourceCard } from '@/components/roadmap/ResourceCard'
import { cn } from '@/lib/cn'
import { useProgress } from '@/progress/useProgress'

type FilterMonth = 'all' | number
type FilterPrice = 'all' | 'free' | 'paid'

function monthNumberForResource(resourceId: string): number | null {
  const match = /^m(\d)\./.exec(resourceId)
  return match ? Number(match[1]) : null
}

export function Resources() {
  const [query, setQuery] = useState('')
  const [monthFilter, setMonthFilter] = useState<FilterMonth>('all')
  const [priceFilter, setPriceFilter] = useState<FilterPrice>('all')
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false)
  const { isBookmarked } = useProgress()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allResources.filter((resource) => {
      if (q && !resource.name.toLowerCase().includes(q) && !resource.note.toLowerCase().includes(q)) return false
      if (monthFilter !== 'all' && monthNumberForResource(resource.id) !== monthFilter) return false
      const isFree = resource.price.toLowerCase().startsWith('free')
      if (priceFilter === 'free' && !isFree) return false
      if (priceFilter === 'paid' && isFree) return false
      if (bookmarkedOnly && !isBookmarked(resource.id)) return false
      return true
    })
  }, [query, monthFilter, priceFilter, bookmarkedOnly, isBookmarked])

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Designator>EVERY RESOURCE, ONE LIBRARY</Designator>
      <h1 className="mt-2 font-display text-4xl text-ink">Resources</h1>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label htmlFor="resource-search" className="sr-only">
          Search resources
        </label>
        <input
          id="resource-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources…"
          className="w-full rounded-md border border-line bg-bg-raised px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-accent sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by month">
          <button
            type="button"
            onClick={() => setMonthFilter('all')}
            aria-pressed={monthFilter === 'all'}
            className={cn(
              'rounded-full border px-2.5 py-1 font-mono text-xs',
              monthFilter === 'all' ? 'border-accent text-accent' : 'border-line text-ink-muted',
            )}
          >
            All months
          </button>
          {months.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMonthFilter(m.number)}
              aria-pressed={monthFilter === m.number}
              className={cn(
                'rounded-full border px-2.5 py-1 font-mono text-xs',
                monthFilter === m.number ? 'border-accent text-accent' : 'border-line text-ink-muted',
              )}
            >
              M{m.number}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by price and bookmarks">
        {(['all', 'free', 'paid'] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPriceFilter(p)}
            aria-pressed={priceFilter === p}
            className={cn(
              'rounded-full border px-2.5 py-1 font-mono text-xs uppercase',
              priceFilter === p ? 'border-accent text-accent' : 'border-line text-ink-muted',
            )}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setBookmarkedOnly((v) => !v)}
          aria-pressed={bookmarkedOnly}
          className={cn(
            'rounded-full border px-2.5 py-1 font-mono text-xs uppercase',
            bookmarkedOnly ? 'border-accent text-accent' : 'border-line text-ink-muted',
          )}
        >
          Bookmarked
        </button>
      </div>

      <p className="mt-4 font-mono text-xs text-ink-faint">
        {filtered.length} of {allResources.length} resources
      </p>

      <div className="mt-3 space-y-2">
        {filtered.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
        {filtered.length === 0 && <p className="py-8 text-center text-sm text-ink-muted">No resources match those filters.</p>}
      </div>
    </div>
  )
}
