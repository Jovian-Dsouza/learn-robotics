import { describe, expect, it } from 'vitest'
import type { Month } from '@/content/types'
import { computeMindMapLayout, MILESTONES_BRANCH_ID } from './layout'

function makeMonth(): Month {
  return {
    id: 'm1',
    number: 1,
    slug: 'month-1',
    title: 'Electronics',
    goal: 'test',
    framing: 'test',
    subsections: [
      {
        id: 's1',
        title: 'Section One',
        focusPoints: [
          { id: 's1.focus.1', label: 'a' },
          { id: 's1.focus.2', label: 'b' },
        ],
        practiceTask: { id: 's1.practice', summary: 'build it' },
      },
      {
        id: 's2',
        title: 'Section Two',
        focusPoints: [{ id: 's2.focus.1', label: 'c' }],
      },
    ],
    milestones: [
      { id: 'm1.milestone.1', label: 'do it' },
      { id: 'm1.milestone.2', label: 'ship it' },
    ],
  }
}

describe('computeMindMapLayout', () => {
  const { nodes, edges } = computeMindMapLayout(makeMonth())

  it('has exactly one root node, at the origin, with no parent', () => {
    const roots = nodes.filter((n) => n.kind === 'root')
    expect(roots).toHaveLength(1)
    expect(roots[0]).toMatchObject({ x: 0, y: 0, parentId: null, sourceId: 'm1' })
  })

  it('has one branch node per section, plus a synthetic milestones branch', () => {
    const branches = nodes.filter((n) => n.kind === 'branch')
    expect(branches.map((b) => b.sourceId).sort()).toEqual(['s1', 's2', MILESTONES_BRANCH_ID].sort())
  })

  it('has one leaf per focus point, practice task, and milestone', () => {
    const leaves = nodes.filter((n) => n.kind === 'leaf')
    // s1: 2 focus + 1 practice = 3, s2: 1 focus = 1, milestones: 2 => 6 total
    expect(leaves).toHaveLength(6)
    expect(leaves.map((l) => l.sourceId).sort()).toEqual(
      ['s1.focus.1', 's1.focus.2', 's1.practice', 's2.focus.1', 'm1.milestone.1', 'm1.milestone.2'].sort(),
    )
  })

  it('every leaf is parented to a real branch node id', () => {
    const branchIds = new Set(nodes.filter((n) => n.kind === 'branch').map((n) => n.id))
    const leaves = nodes.filter((n) => n.kind === 'leaf')
    for (const leaf of leaves) {
      expect(leaf.parentId).not.toBeNull()
      expect(branchIds.has(leaf.parentId as string)).toBe(true)
    }
  })

  it('every node has finite, non-NaN coordinates', () => {
    for (const node of nodes) {
      expect(Number.isFinite(node.x)).toBe(true)
      expect(Number.isFinite(node.y)).toBe(true)
    }
  })

  it('every edge references two ids that exist as nodes', () => {
    const ids = new Set(nodes.map((n) => n.id))
    for (const edge of edges) {
      expect(ids.has(edge.fromId)).toBe(true)
      expect(ids.has(edge.toId)).toBe(true)
    }
  })

  it('has one root→branch edge per branch, and one branch→leaf edge per leaf', () => {
    const branches = nodes.filter((n) => n.kind === 'branch')
    const leaves = nodes.filter((n) => n.kind === 'leaf')
    expect(edges).toHaveLength(branches.length + leaves.length)
  })

  it('all node ids are unique', () => {
    const ids = nodes.map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('handles a section with a single leaf without dividing by zero', () => {
    const singleLeafMonth: Month = {
      ...makeMonth(),
      subsections: [{ id: 'only', title: 'Only', focusPoints: [{ id: 'only.focus', label: 'x' }] }],
    }
    const result = computeMindMapLayout(singleLeafMonth)
    const leaf = result.nodes.find((n) => n.sourceId === 'only.focus')
    expect(leaf).toBeDefined()
    expect(Number.isFinite(leaf?.x)).toBe(true)
    expect(Number.isFinite(leaf?.y)).toBe(true)
  })

  it('handles a month with no milestones and no subsections gracefully', () => {
    const emptyMonth: Month = { ...makeMonth(), subsections: [], milestones: [] }
    const result = computeMindMapLayout(emptyMonth)
    expect(result.nodes.filter((n) => n.kind === 'root')).toHaveLength(1)
    expect(result.nodes.filter((n) => n.kind === 'branch')).toHaveLength(0)
    expect(result.nodes.filter((n) => n.kind === 'leaf')).toHaveLength(0)
    expect(result.edges).toHaveLength(0)
  })
})
