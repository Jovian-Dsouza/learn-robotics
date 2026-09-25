import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BadgeTone = 'free' | 'paid' | 'accent' | 'neutral' | 'done'

interface BadgeProps {
  tone?: BadgeTone
  children: ReactNode
  className?: string
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  free: 'border-done/40 text-done bg-done-soft',
  paid: 'border-ink-faint/50 text-ink-muted bg-bg-raised',
  accent: 'border-accent/50 text-accent bg-accent-soft',
  neutral: 'border-line text-ink-muted bg-bg-raised',
  done: 'border-done/40 text-done bg-done-soft',
}

export function Badge({ tone = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider',
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function PriceBadge({ price }: { price: string }) {
  const isFree = price.toLowerCase() === 'free' || price.toLowerCase().startsWith('free')
  return <Badge tone={isFree ? 'free' : 'paid'}>{isFree ? 'FREE' : price}</Badge>
}
