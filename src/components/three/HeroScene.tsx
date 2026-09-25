import { Scene } from './Scene'
import { Static3DFallback } from './Static3DFallback'
import { HeroRobotArm } from './HeroRobotArm'

interface HeroSceneProps {
  assemblyProgress: number
  height?: number
  className?: string
}

/**
 * Default export so callers can `React.lazy(() => import('./HeroScene'))` —
 * three.js and react-three-fiber only enter the bundle once this module is
 * actually requested, never in the main chunk.
 */
export default function HeroScene({ assemblyProgress, height = 360, className }: HeroSceneProps) {
  return (
    <Scene
      height={height}
      className={className}
      cameraPosition={[2.4, 1.4, 3]}
      fallback={<Static3DFallback height={height} className={className} label="Robot arm illustration" />}
    >
      <HeroRobotArm assemblyProgress={assemblyProgress} />
    </Scene>
  )
}
