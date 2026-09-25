export type SearchItemKind = 'month' | 'section' | 'focus' | 'practice' | 'milestone' | 'resource' | 'page'

export interface SearchItem {
  id: string
  kind: SearchItemKind
  title: string
  subtitle: string
  url: string
  /** Only set for `resource` items — shown as a badge in results. */
  price?: string
}

export const SEARCH_KIND_LABELS: Record<SearchItemKind, string> = {
  month: 'Months',
  section: 'Sections',
  focus: 'Focus points',
  practice: 'Practice tasks',
  milestone: 'Milestones',
  resource: 'Resources',
  page: 'Pages',
}
