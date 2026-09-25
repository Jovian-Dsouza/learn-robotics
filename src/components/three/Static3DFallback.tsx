import type { CSSProperties } from 'react'

interface StaticFallbackProps {
  height?: CSSProperties['height']
  label?: string
  className?: string
}

/**
 * The non-3D placeholder: same footprint and palette as the canvas it
 * replaces, no WebGL and no motion required. Deliberately has zero import of
 * three/@react-three-fiber — Home and Month pages render this eagerly (it's
 * the Suspense fallback), and pulling either of those in here would undo the
 * whole point of lazy-loading Scene.tsx.
 */
export function Static3DFallback({ height = 320, label, className }: StaticFallbackProps) {
  return (
    <div
      style={{ height }}
      className={`flex items-center justify-center rounded-lg border border-line bg-linear-to-br from-accent-soft/40 to-transparent ${className ?? ''}`}
    >
      <svg viewBox="0 0 16 16" width="28" height="28" fill="none" aria-hidden="true" className="text-accent/70">
        <path d="M2 8h2l1-3 2 6 2-6 1 3h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label && <span className="sr-only">{label}</span>}
    </div>
  )
}
