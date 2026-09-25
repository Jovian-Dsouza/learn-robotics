import type { ThreeElements } from '@react-three/fiber'
import { THEME_3D } from '../theme'

type ArmLinkProps = ThreeElements['group'] & {
  length?: number
  color?: string
}

/** An original robot-arm segment: a beveled-looking box link with a joint knuckle at each end. */
export function ArmLink({ length = 1, color = THEME_3D.accent, ...groupProps }: ArmLinkProps) {
  return (
    <group {...groupProps}>
      <mesh position={[length / 2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[length, 0.18, 0.18]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color={THEME_3D.bgRaised} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[length, 0, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color={THEME_3D.bgRaised} metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  )
}

type ServoProps = ThreeElements['group'] & {
  color?: string
}

/** An original stand-in for a bus servo: a body block with a shaft and a small output horn. */
export function Servo({ color = THEME_3D.inkMuted, ...groupProps }: ServoProps) {
  return (
    <group {...groupProps}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.32, 0.32, 0.24]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
        <meshStandardMaterial color={THEME_3D.accent} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.27, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.05, 0.22, 0.03]} />
        <meshStandardMaterial color={THEME_3D.ink} roughness={0.5} />
      </mesh>
    </group>
  )
}
