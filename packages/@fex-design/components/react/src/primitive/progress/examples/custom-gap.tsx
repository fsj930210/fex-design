import { useState } from 'react'
import { CheckIcon } from '@fex-design/react/icons/check'
import { Slider } from '@fex-design/react/ui/slider'
import { Progress, ProgressCircle, ProgressValue } from '@fex-design/react/primitive/progress'

function StepRing({ value, gap, color }: { value: number; gap: number; color: string }) {
  const size = 96
  const thickness = 4
  const steps = 8
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const step = 360 / steps
  const segment = circumference / steps - gap
  const active = Math.round((value / 100) * steps)
  return (
    <Progress value={value} variant="circle" size={size} thickness={thickness} className="relative">
      <ProgressCircle>
        {Array.from({ length: steps }, (_, index) => (
          <circle
            key={index}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={index < active ? color : 'var(--progress-remaining)'}
            strokeWidth={thickness}
            strokeDasharray={`${segment} ${gap + circumference}`}
            strokeDashoffset={-((index * step) / 360) * circumference}
            strokeLinecap="butt"
            pathLength={circumference}
          />
        ))}
      </ProgressCircle>
      <div className="absolute inset-0 flex items-center justify-center">
        {value === 100 ? (
          <CheckIcon className="size-5 text-success" />
        ) : (
          <ProgressValue className="text-sm">{value}%</ProgressValue>
        )}
      </div>
    </Progress>
  )
}
export function ProgressPrimitiveCustomGapExample() {
  const [gap, setGap] = useState(2)
  return (
    <div className="grid w-full max-w-md gap-4">
      <label className="grid gap-2 text-sm">
        <span className="font-medium">分段间隔：{gap}px</span>
        <Slider
          value={gap}
          min={0}
          max={8}
          step={1}
          onChange={(next) => setGap(typeof next === 'number' ? next : (next[0] ?? 2))}
        />
      </label>
      <div className="flex items-center gap-6">
        <StepRing value={50} gap={gap} color="var(--info)" />
        <StepRing value={100} gap={gap} color="var(--success)" />
      </div>
    </div>
  )
}
