import type { PracticeTask as PracticeTaskData } from '@/content/types'
import { Checkbox } from '@/components/ui/Checkbox'
import { Designator } from '@/components/ui/Card'
import { useProgress } from '@/progress/useProgress'
import { BuildLogEditor } from './BuildLogEditor'

export function PracticeTask({ task }: { task: PracticeTaskData }) {
  const { isChecked, toggle } = useProgress()
  const done = isChecked(task.id)

  return (
    <div className="rounded-md border border-line bg-linear-to-br from-accent-soft/40 to-transparent p-3">
      <Designator>WORK ORDER</Designator>
      <div className="mt-1.5">
        <Checkbox id={task.id} checked={done} onChange={() => toggle(task.id)}>
          {task.summary}
        </Checkbox>
      </div>
      {done && <BuildLogEditor key={task.id} id={task.id} />}
    </div>
  )
}
