import { z } from 'zod'

export const PROGRESS_VERSION = 2 as const

// Generous bounds well above what the roadmap's own content ever produces (well
// under a thousand ids and short notes) — they exist to stop a corrupt or
// maliciously crafted import from ballooning localStorage without limit, which
// is what backs the write failures reported via ProgressContextValue.saveError.
export const MAX_NOTE_LENGTH = 4000
export const MAX_RECORD_ENTRIES = 2000

const idKeySchema = z.string().min(1).max(200)

function withEntryLimit<T extends z.ZodRecord>(schema: T, label: string) {
  return schema.refine((record) => Object.keys(record).length <= MAX_RECORD_ENTRIES, {
    message: `${label} cannot have more than ${MAX_RECORD_ENTRIES} entries`,
  })
}

export const directionSchema = z.union([z.literal(1), z.literal(2), z.literal(3), z.null()])

export const progressStateSchema = z.object({
  version: z.literal(PROGRESS_VERSION),
  checked: withEntryLimit(z.record(idKeySchema, z.string()), 'checked'),
  notes: withEntryLimit(z.record(idKeySchema, z.string().max(MAX_NOTE_LENGTH)), 'notes'),
  bookmarks: withEntryLimit(z.record(idKeySchema, z.literal(true)), 'bookmarks'),
  // Which badge unlocks the user has already had celebrated (toast + confetti),
  // so reloading or re-importing doesn't replay them. Badge *unlock* state
  // itself is always derived from checked/notes/direction — see gamification/badges.ts.
  seenBadgeIds: withEntryLimit(z.record(idKeySchema, z.literal(true)), 'seenBadgeIds'),
  direction: directionSchema,
  startedAt: z.string(),
})

export type ProgressState = z.infer<typeof progressStateSchema>
export type Direction = z.infer<typeof directionSchema>

export function createInitialState(now: () => string = () => new Date().toISOString()): ProgressState {
  return {
    version: PROGRESS_VERSION,
    checked: {},
    notes: {},
    bookmarks: {},
    seenBadgeIds: {},
    direction: null,
    startedAt: now(),
  }
}

/**
 * Upgrades a v1 export (no `seenBadgeIds`) to the current shape before
 * validation, so progress saved before badges existed still loads and
 * imports cleanly. Returns the input unchanged if it isn't a v1-shaped object
 * — `parseProgressState` below is the single source of truth for validity.
 */
export function migrateProgressState(input: unknown): unknown {
  if (typeof input !== 'object' || input === null || !('version' in input)) return input
  const record = input as Record<string, unknown>
  if (record.version === 1) {
    return { ...record, version: PROGRESS_VERSION, seenBadgeIds: {} }
  }
  return input
}

export interface ParseResult {
  success: boolean
  state?: ProgressState
  error?: string
}

/** Validates untrusted input (localStorage contents or an imported file) before it enters app state. */
export function parseProgressState(input: unknown): ParseResult {
  const result = progressStateSchema.safeParse(migrateProgressState(input))
  if (result.success) {
    return { success: true, state: result.data }
  }
  return { success: false, error: result.error.issues.map((issue) => issue.message).join('; ') }
}
