import type { Milestone } from '@/content/types'
import { Checkbox } from '@/components/ui/Checkbox'
import { useProgress } from '@/progress/useProgress'

export function MilestoneList({ milestones }: { milestones: Milestone[] }) {
  const { isChecked, toggle } = useProgress()
  const done = milestones.filter((m) => isChecked(m.id)).length

  return (
    <div className="space-y-1">
      <p className="font-mono text-[0.65rem] uppercase tracking-wider text-ink-muted">
        By the end of this month you should be able to — {done}/{milestones.length}
      </p>
      {milestones.map((milestone) => (
        <Checkbox key={milestone.id} id={milestone.id} checked={isChecked(milestone.id)} onChange={() => toggle(milestone.id)}>
          {milestone.label}
        </Checkbox>
      ))}
    </div>
  )
}
