import { CheckIcon } from '@fex-design/react/icons/check'
import {
  Progress,
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressValue,
} from '@fex-design/react/primitive/progress'
const circles = [
  { value: 30, className: 'text-primary' },
  { value: 70, className: 'text-primary' },
  { value: 100, className: 'text-success', success: true, status: 'success' as const },
  { value: 50, className: 'text-primary', status: 'error' as const },
]
export default function CircleExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {circles.map(({ value, className, success, status }) => (
        <Progress
          key={value}
          value={value}
          status={status}
          variant="circle"
          size={96}
          className="relative"
        >
          <ProgressCircle>
            <ProgressCircleTrack />
            <ProgressCircleRange className={className} />
          </ProgressCircle>
          <div className="absolute inset-0 flex items-center justify-center">
            {success ? (
              <CheckIcon className="size-6 text-success" />
            ) : (
              <ProgressValue className="text-sm font-semibold">{value}%</ProgressValue>
            )}
          </div>
        </Progress>
      ))}
    </div>
  )
}
