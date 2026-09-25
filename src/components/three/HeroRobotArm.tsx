import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { ArmLink, Servo, Board, Gear, GlowNode } from './parts'
import { THEME_3D } from './theme'

type Vec3 = [number, number, number]

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function lerpVec3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

interface PartLayout {
  exploded: { position: Vec3; rotation: Vec3 }
  assembled: { position: Vec3; rotation: Vec3 }
}

const LAYOUT: Record<'base' | 'servoBase' | 'link1' | 'servoElbow' | 'link2' | 'gripper', PartLayout> = {
  base: {
    exploded: { position: [0, -1.4, -0.8], rotation: [0, 0, 0.3] },
    assembled: { position: [0, -0.55, 0], rotation: [0, 0, 0] },
  },
  servoBase: {
    exploded: { position: [-1.3, 0.9, -0.6], rotation: [0.6, 0.4, 0] },
    assembled: { position: [0, -0.32, 0], rotation: [0, 0, 0] },
  },
  link1: {
    exploded: { position: [1.2, 1.1, 0.4], rotation: [0, 0.8, 1.1] },
    assembled: { position: [0, -0.18, 0], rotation: [0, 0, Math.PI / 2.6] },
  },
  servoElbow: {
    exploded: { position: [-1.1, -1.2, 0.7], rotation: [0.2, -0.5, 0.8] },
    assembled: { position: [0.55, 0.55, 0], rotation: [0, 0, 0] },
  },
  link2: {
    exploded: { position: [0.9, -0.9, -0.9], rotation: [0.5, 0, -0.6] },
    assembled: { position: [0.55, 0.55, 0], rotation: [0, 0, -Math.PI / 5] },
  },
  gripper: {
    exploded: { position: [-0.8, 1.6, 0.5], rotation: [1, 0.3, 0] },
    assembled: { position: [1.25, 1.05, 0], rotation: [0, 0, -Math.PI / 5] },
  },
}

interface HeroRobotArmProps {
  /** 0 = parts scattered as if unopened on the bench, 1 = fully assembled arm. */
  assemblyProgress: number
}

/**
 * The Home hero centerpiece: an original low-poly 3-DOF arm built from the
 * shared part primitives, drifting from "exploded" to "assembled" as the
 * viewer's overall roadmap progress rises. No reference art or downloaded
 * model — every part is procedural geometry.
 */
export function HeroRobotArm({ assemblyProgress }: HeroRobotArmProps) {
  const t = Math.min(1, Math.max(0, assemblyProgress))
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.18
  })

  const transforms = useMemo(() => {
    const entries = Object.entries(LAYOUT) as [keyof typeof LAYOUT, PartLayout][]
    return Object.fromEntries(
      entries.map(([key, layout]) => [
        key,
        {
          position: lerpVec3(layout.exploded.position, layout.assembled.position, t),
          rotation: lerpVec3(layout.exploded.rotation, layout.assembled.rotation, t),
        },
      ]),
    ) as Record<keyof typeof LAYOUT, { position: Vec3; rotation: Vec3 }>
  }, [t])

  return (
    <group ref={groupRef}>
      <Board width={1.4} depth={1} position={transforms.base.position} rotation={transforms.base.rotation} />
      <Servo position={transforms.servoBase.position} rotation={transforms.servoBase.rotation} />
      <ArmLink length={0.75} position={transforms.link1.position} rotation={transforms.link1.rotation} />
      <Servo position={transforms.servoElbow.position} rotation={transforms.servoElbow.rotation} />
      <ArmLink length={0.6} position={transforms.link2.position} rotation={transforms.link2.rotation} />
      <group position={transforms.gripper.position} rotation={transforms.gripper.rotation}>
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.05, 0.18, 0.05]} />
          <meshStandardMaterial color={THEME_3D.ink} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[0.05, 0.18, 0.05]} />
          <meshStandardMaterial color={THEME_3D.ink} roughness={0.5} />
        </mesh>
      </group>

      {/* A decorative loose gear and a glow node — both fade in as the arm nears completion. */}
      <Gear radius={0.32} thickness={0.1} spinSpeed={0.6} position={[-1.1, -0.7, -0.3]} visible={t > 0.15} />
      <GlowNode radius={0.07} position={[1.6, 1.3, 0.2]} visible={t > 0.6} />
    </group>
  )
}
