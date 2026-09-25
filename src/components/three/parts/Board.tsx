import type { ThreeElements } from '@react-three/fiber'
import { THEME_3D } from '../theme'

type BoardProps = ThreeElements['group'] & {
  width?: number
  depth?: number
  color?: string
}

/** An original stand-in for a PCB: a thin plate with a few raised component blocks. */
export function Board({ width = 1, depth = 0.7, color = THEME_3D.inkMuted, ...groupProps }: BoardProps) {
  const bumps = [
    { x: -width * 0.25, z: -depth * 0.15, h: 0.08, w: 0.16 },
    { x: width * 0.1, z: depth * 0.2, h: 0.05, w: 0.22 },
    { x: width * 0.28, z: -depth * 0.1, h: 0.1, w: 0.1 },
  ]
  return (
    <group {...groupProps}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, 0.05, depth]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {bumps.map((bump, i) => (
        <mesh key={i} position={[bump.x, 0.025 + bump.h / 2, bump.z]}>
          <boxGeometry args={[bump.w, bump.h, bump.w]} />
          <meshStandardMaterial color={i === 1 ? THEME_3D.accent : THEME_3D.ink} metalness={0.2} roughness={0.5} />
        </mesh>
      ))}
    </group>
  )
}

type GlowNodeProps = ThreeElements['group'] & {
  radius?: number
  color?: string
}

/** An original glowing sphere used to suggest a learned/neural node — emissive material, no external texture. */
export function GlowNode({ radius = 0.1, color = THEME_3D.done, ...groupProps }: GlowNodeProps) {
  return (
    <group {...groupProps}>
      <mesh>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} roughness={0.3} />
      </mesh>
    </group>
  )
}
