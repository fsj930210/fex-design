import { CheckIcon } from '@fex-design/react/icons/check'
import {
  Progress,
  ProgressCircle,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/react/primitive/progress'
function StepLine({ active, value }: { active: number; value: number }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <Progress value={value} className="contents">
        <ProgressTrack className="flex h-auto w-auto min-w-0 items-center gap-1 overflow-visible bg-transparent">
          {Array.from({ length: 5 }, (_, index) => (
            <ProgressRange
              key={index}
              value={1}
              style={{ width: '1rem' }}
              className={`h-2 flex-none rounded-[1px] ${index < active ? 'bg-info' : 'bg-[var(--progress-remaining)]'}`}
            />
          ))}
        </ProgressTrack>
        {active < 5 ? (
          <ProgressValue className="text-sm">{value}%</ProgressValue>
        ) : (
          <span className="flex size-4 items-center justify-center rounded-full bg-success text-white">
            <CheckIcon className="size-3" />
          </span>
        )}
      </Progress>
    </div>
  )
}
function StepCircle({ value }: { value: number }) {
  const size = 96
  const thickness = 4
  const steps = 10
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const gapLength = 2
  const segment = circumference / steps - gapLength
  const active = Math.round((value / 100) * steps)
  const stroke = value === 100 ? 'var(--success)' : 'var(--info)'
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
            stroke={index < active ? stroke : 'var(--progress-remaining)'}
            strokeWidth={thickness}
            strokeDasharray={`${segment} ${gapLength + circumference}`}
            strokeDashoffset={-((index * 36) / 360) * circumference}
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
export function ProgressPrimitiveSegmentedExample() {
  return (
    <div className="grid w-full max-w-md gap-5">
      <div className="grid gap-3">
        <StepLine active={3} value={50} />
        <StepLine active={4} value={80} />
        <StepLine active={5} value={100} />
      </div>
      <div className="flex items-center gap-6">
        <StepCircle value={50} />
        <StepCircle value={80} />
        <StepCircle value={100} />
      </div>
    </div>
  )
}
