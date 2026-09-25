import { useNavigate } from 'react-router-dom'
import type { Month } from '@/content/types'
import type { ProgressState } from '@/progress/schema'
import { isMonthComplete } from '@/progress/selectors'
import { buildScrollUrl } from '@/lib/scrollTarget'
import { computeMindMapLayout, type MindMapNode } from '@/mindmap/layout'
import { cn } from '@/lib/cn'

const VIEWBOX_PADDING = 60
const NODE_RADIUS: Record<MindMapNode['kind'], number> = { root: 26, branch: 14, leaf: 7 }

interface MindMapDiagramProps {
  month: Month
  progress: ProgressState
}

function nodeColor(node: MindMapNode, progress: ProgressState): string {
  if (node.kind === 'root') return 'var(--color-ink)'
  if (node.kind === 'leaf') return node.sourceId in progress.checked ? 'var(--color-done)' : 'var(--color-line)'
  // branch: done if it has no unchecked descendants would need extra bookkeeping — keep it simple and honest:
  // an accent border once anything under it is checked, done once the whole month is (rare at branch level).
  return 'var(--color-accent)'
}

/** A quadratic curve from parent to child, bowing slightly outward — reads as a hand-drawn mind-map branch rather than a rigid line. */
function edgePath(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2
  const bow = 0.15
  const controlX = midX - (to.y - from.y) * bow
  const controlY = midY + (to.x - from.x) * bow
  return `M ${from.x},${from.y} Q ${controlX},${controlY} ${to.x},${to.y}`
}

export function MindMapDiagram({ month, progress }: MindMapDiagramProps) {
  const navigate = useNavigate()
  const { nodes, edges } = computeMindMapLayout(month)
  const nodeById = new Map(nodes.map((n) => [n.id, n]))
  const monthDone = isMonthComplete(month, progress)

  const extent = Math.max(...nodes.map((n) => Math.max(Math.abs(n.x), Math.abs(n.y))), 100) + VIEWBOX_PADDING

  function handleActivate(node: MindMapNode) {
    if (node.kind === 'root') {
      navigate(buildScrollUrl(month.slug))
      return
    }
    navigate(buildScrollUrl(month.slug, node.sourceId))
  }

  return (
    <svg
      viewBox={`${-extent} ${-extent} ${extent * 2} ${extent * 2}`}
      className="h-[min(70vh,600px)] w-full"
      role="img"
      aria-label={`Mind map of ${month.title}`}
    >
      {edges.map((edge) => {
        const from = nodeById.get(edge.fromId)
        const to = nodeById.get(edge.toId)
        if (!from || !to) return null
        return (
          <path
            key={`${edge.fromId}-${edge.toId}`}
            d={edgePath(from, to)}
            fill="none"
            stroke="var(--color-line)"
            strokeWidth={1.5}
          />
        )
      })}

      {nodes.map((node) => {
        const color = node.kind === 'root' && monthDone ? 'var(--color-done)' : nodeColor(node, progress)
        return (
          <g
            key={node.id}
            tabIndex={0}
            role="button"
            aria-label={node.label}
            className="cursor-pointer outline-none focus-visible:opacity-80"
            onClick={() => handleActivate(node)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleActivate(node)
              }
            }}
          >
            <title>{node.label}</title>
            <circle cx={node.x} cy={node.y} r={NODE_RADIUS[node.kind]} fill={node.kind === 'leaf' ? color : 'var(--color-card)'} stroke={color} strokeWidth={node.kind === 'leaf' ? 1.5 : 2} />
            <text
              x={node.x}
              y={node.y + NODE_RADIUS[node.kind] + (node.kind === 'leaf' ? 11 : 14)}
              textAnchor="middle"
              className={cn(
                'select-none font-mono',
                node.kind === 'root' ? 'text-[13px] fill-ink' : node.kind === 'branch' ? 'text-[10px] fill-ink-muted' : 'text-[8px] fill-ink-faint',
              )}
            >
              {truncate(node.label, node.kind === 'leaf' ? 14 : 20)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}
