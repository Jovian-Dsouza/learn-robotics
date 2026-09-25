import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import type { ThreeElements } from '@react-three/fiber'
import { THEME_3D } from '../theme'

const TOOTH_COUNT = 8

type GearProps = ThreeElements['group'] & {
  radius?: number
  thickness?: number
  color?: string
  spinSpeed?: number
}

/** An original, low-poly gear: a cylinder hub with a ring of small teeth boxes — no reference art used. */
export function Gear({ radius = 0.5, thickness = 0.18, color = THEME_3D.accent, spinSpeed = 0, ...groupProps }: GearProps) {
  const ref = useRef<Group>(null)

  useFrame((_, delta) => {
    if (ref.current && spinSpeed) ref.current.rotation.z += delta * spinSpeed
  })

  const teeth = Array.from({ length: TOOTH_COUNT }, (_, i) => {
    const angle = (i / TOOTH_COUNT) * Math.PI * 2
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, angle }
  })

  return (
    <group ref={ref} {...groupProps}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius * 0.7, radius * 0.7, thickness, 24]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[radius * 0.2, radius * 0.2, thickness * 1.1, 16]} />
        <meshStandardMaterial color={THEME_3D.bgRaised} metalness={0.6} roughness={0.3} />
      </mesh>
      {teeth.map((tooth, i) => (
        <mesh key={i} position={[tooth.x, tooth.y, 0]} rotation={[Math.PI / 2, 0, tooth.angle]}>
          <boxGeometry args={[radius * 0.22, thickness, radius * 0.18]} />
          <meshStandardMaterial color={color} metalness={0.4} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

type WheelProps = ThreeElements['group'] & {
  radius?: number
  width?: number
  color?: string
}

/** An original wheel-and-tire block: a ring plus a hub cylinder. */
export function Wheel({ radius = 0.5, width = 0.3, color = THEME_3D.inkMuted, ...groupProps }: WheelProps) {
  const meshRef = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.x += delta * 0.6
  })
  return (
    <group {...groupProps}>
      <mesh ref={meshRef} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[radius, radius, width, 24]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[radius * 0.35, radius * 0.35, width * 1.15, 16]} />
        <meshStandardMaterial color={THEME_3D.accent} metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  )
}
