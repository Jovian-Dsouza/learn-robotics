interface ProgressRingProps {
  percent: number
  size?: number
  strokeWidth?: number
  label?: string
}

export function ProgressRing({ percent, size = 72, strokeWidth = 6, label }: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, percent))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference
  const isComplete = clamped >= 100

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 transform" role="img" aria-label={label ?? `${clamped}% complete`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-line)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isComplete ? 'var(--color-done)' : 'var(--color-accent)'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <span className="absolute font-mono text-sm font-medium text-ink">{clamped}%</span>
    </div>
  )
}
