/**
 * Builds a link to a month page that optionally scrolls to and highlights a
 * specific item once there. Uses a query param rather than a URL `#anchor`
 * because the app is a HashRouter (`/#/month/slug`) — a second `#` can't
 * coexist with the router's own hash.
 */
export function buildScrollUrl(monthSlug: string, targetId?: string): string {
  if (!targetId) return `/month/${monthSlug}`
  return `/month/${monthSlug}?scrollTo=${encodeURIComponent(targetId)}`
}
