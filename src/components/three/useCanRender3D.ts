import { useEffect, useState } from 'react'
import { hasWebGL, prefersReducedMotion } from './support'

/**
 * Whether this device/user should get the WebGL scenes at all — checked
 * *before* anything triggers `React.lazy(() => import('./HeroScene'))`, so a
 * reduced-motion or no-WebGL visitor never pays for downloading the three.js
 * chunk just to render a static fallback. Returns `null` on the very first
 * render (avoids a layout jump while we check).
 */
export function useCanRender3D(): boolean | null {
  const [canRender, setCanRender] = useState<boolean | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const evaluate = () => setCanRender(hasWebGL() && !prefersReducedMotion())
    evaluate()
    mediaQuery.addEventListener('change', evaluate)
    return () => mediaQuery.removeEventListener('change', evaluate)
  }, [])

  return canRender
}
