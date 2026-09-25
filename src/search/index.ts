import type { Month } from '@/content/types'
import { buildScrollUrl } from '@/lib/scrollTarget'
import type { SearchItem } from './types'

/** Static, non-roadmap pages worth being able to jump to from search. */
const STATIC_PAGES: SearchItem[] = [
  { id: 'page.directions', kind: 'page', title: 'Directions', subtitle: 'The three career directions', url: '/directions' },
  { id: 'page.portfolio', kind: 'page', title: 'Portfolio', subtitle: 'README checklist, interview prep', url: '/portfolio' },
  { id: 'page.outlook', kind: 'page', title: 'Outlook', subtitle: 'Pay, demand, and what to expect', url: '/outlook' },
  { id: 'page.resources', kind: 'page', title: 'Resources', subtitle: 'Every resource in one library', url: '/resources' },
  { id: 'page.dashboard', kind: 'page', title: 'Dashboard', subtitle: 'Your progress, streak, and badges', url: '/dashboard' },
  { id: 'page.mindmaps', kind: 'page', title: 'Mind Maps', subtitle: 'Each month as a topic map', url: '/mindmaps' },
]

/** Flattens the roadmap content into one searchable list. Pure — safe to build once at module load. */
export function buildSearchIndex(months: Month[]): SearchItem[] {
  const items: SearchItem[] = [...STATIC_PAGES]

  for (const month of months) {
    items.push({
      id: month.id,
      kind: 'month',
      title: month.title,
      subtitle: month.goal,
      url: buildScrollUrl(month.slug),
    })

    for (const section of month.subsections) {
      items.push({
        id: section.id,
        kind: 'section',
        title: section.title,
        subtitle: `${month.title}${section.intro ? ' · ' + section.intro : ''}`,
        url: buildScrollUrl(month.slug, section.id),
      })

      for (const focus of section.focusPoints ?? []) {
        items.push({
          id: focus.id,
          kind: 'focus',
          title: focus.label,
          subtitle: `${month.title} · ${section.title}`,
          url: buildScrollUrl(month.slug, focus.id),
        })
      }

      if (section.practiceTask) {
        items.push({
          id: section.practiceTask.id,
          kind: 'practice',
          title: section.practiceTask.summary,
          subtitle: `${month.title} · ${section.title} · Practice`,
          url: buildScrollUrl(month.slug, section.practiceTask.id),
        })
      }

      for (const resource of section.resources ?? []) {
        items.push({
          id: resource.id,
          kind: 'resource',
          title: resource.name,
          subtitle: resource.note,
          url: buildScrollUrl(month.slug, resource.id),
          price: resource.price,
        })
      }
    }

    for (const milestone of month.milestones) {
      items.push({
        id: milestone.id,
        kind: 'milestone',
        title: milestone.label,
        subtitle: `${month.title} · Milestone`,
        url: buildScrollUrl(month.slug, milestone.id),
      })
    }
  }

  return items
}

export * from './types'
