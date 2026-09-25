import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <div className={cn('rounded-lg border border-line bg-card/80 p-4 sm:p-5', className)} {...rest}>
      {children}
    </div>
  )
}

interface DesignatorProps {
  children: ReactNode
  className?: string
}

/** A small component-style label, e.g. "M1.2 · BENCH" — mimics a schematic reference designator. */
export function Designator({ children, className }: DesignatorProps) {
  return <span className={cn('font-mono text-xs tracking-widest text-accent', className)}>{children}</span>
}
