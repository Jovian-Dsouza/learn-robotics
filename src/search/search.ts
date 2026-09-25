import type { SearchItem, SearchItemKind } from './types'

const DEFAULT_LIMIT = 30

// Roughly "how specific is this result" — used as a tiebreaker after text-match score.
const KIND_PRIORITY: Record<SearchItemKind, number> = {
  page: 0,
  month: 1,
  resource: 2,
  section: 3,
  practice: 4,
  focus: 5,
  milestone: 6,
}

function scoreMatch(item: SearchItem, query: string): number {
  const title = item.title.toLowerCase()
  const subtitle = item.subtitle.toLowerCase()

  if (title === query) return 4
  if (title.startsWith(query)) return 3
  if (title.includes(query)) return 2
  if (subtitle.includes(query)) return 1
  return 0
}

/**
 * Case-insensitive search across a pre-built index. Pure — no DOM, no state.
 * Empty/whitespace-only queries return nothing rather than the whole index,
 * so a freshly-opened command palette doesn't dump 150+ rows on screen.
 */
export function searchItems(index: SearchItem[], query: string, limit: number = DEFAULT_LIMIT): SearchItem[] {
  const trimmed = query.trim().toLowerCase()
  if (trimmed === '') return []

  return index
    .map((item) => ({ item, score: scoreMatch(item, trimmed) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      const kindDiff = KIND_PRIORITY[a.item.kind] - KIND_PRIORITY[b.item.kind]
      if (kindDiff !== 0) return kindDiff
      return a.item.title.localeCompare(b.item.title)
    })
    .slice(0, limit)
    .map(({ item }) => item)
}

/** Groups results by kind, in a fixed display order, for the command palette. */
export function groupByKind(items: SearchItem[]): { kind: SearchItemKind; items: SearchItem[] }[] {
  const order: SearchItemKind[] = ['month', 'section', 'practice', 'focus', 'milestone', 'resource', 'page']
  return order
    .map((kind) => ({ kind, items: items.filter((item) => item.kind === kind) }))
    .filter((group) => group.items.length > 0)
}
