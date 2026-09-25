import type { CSSProperties, ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { THEME_3D } from './theme'
import { useCanRender3D } from './useCanRender3D'

// Note: Static3DFallback deliberately lives in its own file (Static3DFallback.tsx),
// not here — Home/Month import the fallback eagerly (it's their Suspense
// fallback), and this file imports @react-three/fiber, which must stay
// reachable only through the lazy-loaded HeroScene/MonthIconScene modules.

interface SceneProps {
  children: ReactNode
  fallback: ReactNode
  height?: CSSProperties['height']
  cameraPosition?: [number, number, number]
  fov?: number
  className?: string
}

/**
 * The single gate every 3D visual in the app renders through. Decides once
 * per mount (and again if the user toggles OS-level reduced-motion) whether
 * to spend a WebGL context, and renders `fallback` instead when the device
 * can't or the user would rather it didn't.
 */
export function Scene({ children, fallback, height = 320, cameraPosition = [2, 1.4, 3], fov = 40, className }: SceneProps) {
  const canRender = useCanRender3D()

  if (canRender === null) return <div style={{ height }} className={className} aria-hidden="true" />
  if (!canRender) return <>{fallback}</>

  return (
    <div style={{ height }} className={className}>
      <Canvas camera={{ position: cameraPosition, fov }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} color={THEME_3D.ink} />
        <pointLight position={[-2, -1, -2]} intensity={0.7} color={THEME_3D.accent} />
        {children}
      </Canvas>
    </div>
  )
}
