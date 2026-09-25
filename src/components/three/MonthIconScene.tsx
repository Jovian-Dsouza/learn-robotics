import { Scene } from './Scene'
import { Static3DFallback } from './Static3DFallback'
import { MonthIcon3D } from './MonthIcon3D'

interface MonthIconSceneProps {
  monthNumber: number
  height?: number
  className?: string
}

/** Default export for `React.lazy` — see HeroScene.tsx for why. */
export default function MonthIconScene({ monthNumber, height = 96, className }: MonthIconSceneProps) {
  return (
    <Scene
      height={height}
      className={className}
      cameraPosition={[1.1, 0.8, 1.4]}
      fov={35}
      fallback={<Static3DFallback height={height} className={className} label={`Month ${monthNumber} icon`} />}
    >
      <MonthIcon3D monthNumber={monthNumber} />
    </Scene>
  )
}
