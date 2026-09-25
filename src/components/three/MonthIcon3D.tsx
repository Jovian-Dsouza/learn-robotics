import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { ArmLink, Board, Gear, GlowNode, Servo, Wheel } from './parts'
import { THEME_3D } from './theme'

interface MonthIcon3DProps {
  monthNumber: number
}

function ElectronicsIcon() {
  return (
    <group>
      <Board width={1.1} depth={0.8} position={[0, -0.1, 0]} />
      <mesh position={[-0.25, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 12]} />
        <meshStandardMaterial color={THEME_3D.accent} roughness={0.5} />
      </mesh>
      <mesh position={[0.25, 0.12, 0]}>
        <boxGeometry args={[0.18, 0.14, 0.1]} />
        <meshStandardMaterial color={THEME_3D.ink} roughness={0.4} />
      </mesh>
    </group>
  )
}

function MotorsIcon() {
  return (
    <group>
      <Wheel radius={0.42} width={0.28} position={[-0.35, 0, 0]} />
      <Wheel radius={0.42} width={0.28} position={[0.35, 0, 0]} />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.16, 0.16]} />
        <meshStandardMaterial color={THEME_3D.bgRaised} metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  )
}

function CadIcon() {
  return (
    <group>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.6, 0.5, 0.6]} />
        <meshStandardMaterial color={THEME_3D.bgRaised} roughness={0.6} wireframe />
      </mesh>
      <mesh position={[0, 0.28, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.08, 0.22, 16]} />
        <meshStandardMaterial color={THEME_3D.accent} metalness={0.4} roughness={0.3} />
      </mesh>
    </group>
  )
}

function Ros2Icon() {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.015, 8, 32]} />
        <meshStandardMaterial color={THEME_3D.inkMuted} wireframe />
      </mesh>
      <mesh position={[0.15, -0.15, 0.1]}>
        <boxGeometry args={[0.18, 0.1, 0.14]} />
        <meshStandardMaterial color={THEME_3D.accent} roughness={0.5} />
      </mesh>
      <GlowNode radius={0.05} position={[-0.2, 0.2, -0.1]} />
    </group>
  )
}

function MathsIcon() {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0.4, 0]}>
        <torusGeometry args={[0.38, 0.05, 12, 32]} />
        <meshStandardMaterial color={THEME_3D.accent} metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={THEME_3D.ink} roughness={0.4} />
      </mesh>
    </group>
  )
}

function LearningIcon() {
  return (
    <group>
      <ArmLink length={0.55} position={[-0.3, -0.1, 0]} rotation={[0, 0, 0.6]} />
      <Servo position={[0.15, 0.15, 0]} />
      <GlowNode radius={0.08} position={[0.45, 0.35, 0.1]} />
      <GlowNode radius={0.05} position={[0.25, 0.5, -0.1]} />
      <GlowNode radius={0.05} position={[0.6, 0.5, 0.15]} />
    </group>
  )
}

const ICONS_BY_MONTH: Record<number, () => React.JSX.Element> = {
  1: ElectronicsIcon,
  2: MotorsIcon,
  3: CadIcon,
  4: Ros2Icon,
  5: MathsIcon,
  6: LearningIcon,
}

/** A ~small, per-month composition of the shared part primitives — original geometry, switched by theme rather than by any downloaded model. */
export function MonthIcon3D({ monthNumber }: MonthIcon3DProps) {
  const groupRef = useRef<Group>(null)
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.5
  })

  const Icon = ICONS_BY_MONTH[monthNumber] ?? Gear

  return (
    <group ref={groupRef}>
      <Icon />
    </group>
  )
}
