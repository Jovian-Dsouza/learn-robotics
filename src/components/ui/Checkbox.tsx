import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CheckboxProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  children: ReactNode
  className?: string
}

export function Checkbox({ id, checked, onChange, children, className }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'group flex cursor-pointer items-start gap-3 rounded-md border border-transparent px-2 py-1.5 -mx-2 transition-colors hover:border-line hover:bg-bg-raised/60',
        className,
      )}
    >
      <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-ink-faint bg-bg-raised transition-colors group-has-[:checked]:border-done group-has-[:checked]:bg-done-soft">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className={cn('h-3 w-3 text-done transition-opacity', checked ? 'opacity-100' : 'opacity-0')}
        >
          <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={cn('text-sm leading-snug transition-colors', checked ? 'text-ink-muted line-through decoration-ink-faint' : 'text-ink')}>
        {children}
      </span>
    </label>
  )
}
