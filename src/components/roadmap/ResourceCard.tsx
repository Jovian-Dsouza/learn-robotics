import type { Resource } from '@/content/types'
import { PriceBadge } from '@/components/ui/Badge'
import { useProgress } from '@/progress/useProgress'
import { cn } from '@/lib/cn'

export function ResourceCard({ resource }: { resource: Resource }) {
  const { isBookmarked, toggleResourceBookmark } = useProgress()
  const bookmarked = isBookmarked(resource.id)

  return (
    <div className="flex items-start gap-3 rounded-md border border-line bg-bg-raised/50 p-3 transition-colors hover:border-accent/40">
      <button
        type="button"
        onClick={() => toggleResourceBookmark(resource.id)}
        aria-pressed={bookmarked}
        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this resource'}
        className={cn('mt-0.5 shrink-0 transition-colors', bookmarked ? 'text-accent' : 'text-ink-faint hover:text-ink-muted')}
      >
        <svg viewBox="0 0 16 16" width="16" height="16" fill={bookmarked ? 'currentColor' : 'none'}>
          <path d="M3.5 2.5h9v11l-4.5-3-4.5 3v-11z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink underline decoration-ink-faint decoration-dotted underline-offset-4 hover:text-accent hover:decoration-accent"
          >
            {resource.name}
          </a>
          <PriceBadge price={resource.price} />
        </div>
        <p className="mt-1 text-sm leading-snug text-ink-muted">{resource.note}</p>
      </div>
    </div>
  )
}
