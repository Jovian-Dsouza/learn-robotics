import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { useProgress } from '@/progress/useProgress'
import { BADGES } from '@/gamification/badges'
import { prefersReducedMotion } from '@/components/three/support'

export interface CelebratingBadge {
  id: string
  title: string
  description: string
}

const TOAST_DURATION_MS = 4500

/**
 * Watches for badge unlocks the user hasn't seen celebrated yet, queues them
 * (one toast at a time, in case several unlock from the same click), fires a
 * confetti burst per unlock (skipped under prefers-reduced-motion — the toast
 * still shows), and marks each as seen so it never replays.
 */
export function useBadgeCelebration() {
  const { newlyUnlockedBadges, markBadgeSeen } = useProgress()
  const [queue, setQueue] = useState<CelebratingBadge[]>([])
  const processedIds = useRef<Set<string>>(new Set())

  useEffect(() => {
    const fresh = newlyUnlockedBadges.filter((id) => !processedIds.current.has(id))
    if (fresh.length === 0) return

    for (const id of fresh) processedIds.current.add(id)
    const toShow = fresh
      .map((id) => BADGES.find((badge) => badge.id === id))
      .filter((badge): badge is (typeof BADGES)[number] => !!badge)
      .map(({ id, title, description }) => ({ id, title, description }))

    setQueue((prev) => [...prev, ...toShow])
    if (!prefersReducedMotion()) {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.3 }, colors: ['#ff6a1a', '#7cffb2', '#f2ede1'] })
    }
    for (const id of fresh) markBadgeSeen(id)
  }, [newlyUnlockedBadges, markBadgeSeen])

  const current = queue[0] ?? null

  useEffect(() => {
    if (!current) return
    const timer = setTimeout(() => setQueue((prev) => prev.slice(1)), TOAST_DURATION_MS)
    return () => clearTimeout(timer)
  }, [current])

  return { current, dismiss: () => setQueue((prev) => prev.slice(1)) }
}
