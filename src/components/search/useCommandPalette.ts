import { useEffect, useState } from 'react'

/**
 * Owns the open/closed state and the global `Cmd/Ctrl+K` (and bare `/`, when
 * no input/textarea is focused) shortcut to open it from anywhere in the app.
 */
export function useCommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isCmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
      const target = event.target as HTMLElement | null
      const isTypingElsewhere = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable

      if (isCmdK) {
        event.preventDefault()
        setOpen((prev) => !prev)
        return
      }
      if (event.key === '/' && !isTypingElsewhere && !open) {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return { open, setOpen, onOpen: () => setOpen(true), onClose: () => setOpen(false) }
}
