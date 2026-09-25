import type { Callout as CalloutData } from '@/content/types'
import { cn } from '@/lib/cn'

const KIND_STYLES: Record<CalloutData['kind'], { border: string; label: string; labelText: string }> = {
  tip: { border: 'border-done/40', label: 'text-done', labelText: 'TIP' },
  warning: { border: 'border-accent/50', label: 'text-accent', labelText: 'WATCH OUT' },
  gap: { border: 'border-ink-faint/60', label: 'text-ink-muted', labelText: 'HONEST GAP' },
}

export function Callout({ callout }: { callout: CalloutData }) {
  const style = KIND_STYLES[callout.kind]
  return (
    <div className={cn('rounded-md border-l-2 bg-bg-raised/70 p-3', style.border)}>
      <p className={cn('font-mono text-[0.65rem] uppercase tracking-wider', style.label)}>
        {style.labelText} — {callout.title}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{callout.body}</p>
    </div>
  )
}
