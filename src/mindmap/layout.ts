import type { Month } from '@/content/types'

export const MILESTONES_BRANCH_ID = 'milestones'

const BRANCH_RADIUS = 140
const LEAF_RADIUS = 100
/** Alternating leaves sit this much further out, so a dense branch's labels interleave instead of lining up radially. */
const LEAF_RADIUS_STAGGER = 26
/** Leaves spread across this fraction of their branch's angular slice, leaving a gap between neighbouring clusters. */
const LEAF_ARC_FRACTION = 0.62

export type MindMapNodeKind = 'root' | 'branch' | 'leaf'

export interface MindMapNode {
  /** Unique within this diagram. Equals `sourceId` for everything except the root. */
  id: string
  /** The real content id (month/section/focus/practice/milestone) — used for progress colour and navigation. */
  sourceId: string
  label: string
  kind: MindMapNodeKind
  x: number
  y: number
  parentId: string | null
}

export interface MindMapEdge {
  fromId: string
  toId: string
}

export interface MindMapLayout {
  nodes: MindMapNode[]
  edges: MindMapEdge[]
}

interface Branch {
  sourceId: string
  label: string
  leaves: { sourceId: string; label: string }[]
}

/**
 * A month's sections, plus a synthetic "Milestones" branch (only when the
 * month actually has milestones) so they get a place in the diagram too.
 */
function branchesFor(month: Month): Branch[] {
  const branches: Branch[] = month.subsections.map((section) => ({
    sourceId: section.id,
    label: section.title,
    leaves: [
      ...(section.focusPoints ?? []).map((f) => ({ sourceId: f.id, label: f.label })),
      ...(section.practiceTask ? [{ sourceId: section.practiceTask.id, label: section.practiceTask.summary }] : []),
    ],
  }))

  if (month.milestones.length > 0) {
    branches.push({
      sourceId: MILESTONES_BRANCH_ID,
      label: 'Milestones',
      leaves: month.milestones.map((m) => ({ sourceId: m.id, label: m.label })),
    })
  }

  return branches
}

/** Pure radial-tree layout: root at the origin, branches evenly spaced around it, leaves fanned out past each branch. */
export function computeMindMapLayout(month: Month): MindMapLayout {
  const branches = branchesFor(month)
  const nodes: MindMapNode[] = [{ id: month.id, sourceId: month.id, label: month.title, kind: 'root', x: 0, y: 0, parentId: null }]
  const edges: MindMapEdge[] = []

  const sliceAngle = (2 * Math.PI) / Math.max(branches.length, 1)

  branches.forEach((branch, i) => {
    const branchAngle = i * sliceAngle - Math.PI / 2
    const branchX = Math.cos(branchAngle) * BRANCH_RADIUS
    const branchY = Math.sin(branchAngle) * BRANCH_RADIUS

    nodes.push({ id: branch.sourceId, sourceId: branch.sourceId, label: branch.label, kind: 'branch', x: branchX, y: branchY, parentId: month.id })
    edges.push({ fromId: month.id, toId: branch.sourceId })

    const arcWidth = sliceAngle * LEAF_ARC_FRACTION
    const leafCount = branch.leaves.length

    branch.leaves.forEach((leaf, j) => {
      const offset = leafCount > 1 ? (j / (leafCount - 1) - 0.5) * arcWidth : 0
      const leafAngle = branchAngle + offset
      const radius = BRANCH_RADIUS + LEAF_RADIUS + (j % 2) * LEAF_RADIUS_STAGGER

      nodes.push({
        id: leaf.sourceId,
        sourceId: leaf.sourceId,
        label: leaf.label,
        kind: 'leaf',
        x: Math.cos(leafAngle) * radius,
        y: Math.sin(leafAngle) * radius,
        parentId: branch.sourceId,
      })
      edges.push({ fromId: branch.sourceId, toId: leaf.sourceId })
    })
  })

  return { nodes, edges }
}
