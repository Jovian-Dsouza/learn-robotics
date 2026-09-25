import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@/progress/useProgress'
import { MAX_NOTE_LENGTH } from '@/progress/schema'

const SAVE_DELAY_MS = 500

/**
 * Logs what broke and how it got fixed — the article's single highest-value practice.
 * Callers must render this with `key={id}` so it remounts (and re-reads the saved
 * note) whenever the task it's attached to changes, instead of syncing via effect.
 */
export function BuildLogEditor({ id }: { id: string }) {
  const { getNote, updateNote } = useProgress()
  const [draft, setDraft] = useState(() => getNote(id))
  const [saved, setSaved] = useState(true)

  // Keep the latest args in refs so the unmount-flush effect below can read
  // them without re-running (and re-arming its own cleanup) on every keystroke.
  const pendingRef = useRef({ id, draft, saved })
  pendingRef.current = { id, draft, saved }

  useEffect(() => {
    if (saved) return
    const handle = setTimeout(() => {
      updateNote(id, draft)
      setSaved(true)
    }, SAVE_DELAY_MS)
    return () => clearTimeout(handle)
  }, [draft, saved, id, updateNote])

  // Flush any unsaved keystrokes when this editor unmounts (task unchecked,
  // navigated away) instead of letting the debounce timer above get cancelled
  // mid-flight and silently drop them.
  useEffect(() => {
    return () => {
      const pending = pendingRef.current
      if (!pending.saved) updateNote(pending.id, pending.draft)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally runs once, reads latest via ref
  }, [])

  return (
    <div className="mt-3 rounded-md border border-dashed border-ink-faint/50 bg-bg/60 p-3">
      <label htmlFor={`log-${id}`} className="font-mono text-[0.65rem] uppercase tracking-wider text-ink-muted">
        Build log — what broke, and how you fixed it
      </label>
      <textarea
        id={`log-${id}`}
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value)
          setSaved(false)
        }}
        placeholder="e.g. gripper kept slipping on the cube — reprinted fingers in TPU at 40% infill, fixed it"
        rows={2}
        maxLength={MAX_NOTE_LENGTH}
        className="mt-1.5 w-full resize-y rounded-sm border border-line bg-transparent p-2 text-sm text-ink placeholder:text-ink-faint focus:border-accent"
      />
      <p aria-live="polite" className="mt-1 font-mono text-[0.6rem] text-ink-faint">
        {saved ? 'saved' : 'saving…'}
      </p>
    </div>
  )
}
