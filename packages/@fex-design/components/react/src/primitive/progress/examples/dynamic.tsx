import { useState } from 'react'
import {
  Progress,
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/react/primitive/progress'
export function ProgressPrimitiveDynamicExample() {
  const [value, setValue] = useState(30)
  return (
    <div className="grid w-full max-w-md gap-4">
      <div className="flex items-center gap-6">
        <Progress value={value} className="flex min-w-0 flex-1 flex-col">
          <div className="flex w-full items-center">
            <ProgressTrack className="min-w-0 flex-1">
              <ProgressRange />
            </ProgressTrack>
            <ProgressValue className="ms-2 shrink-0 text-sm">{value}%</ProgressValue>
          </div>
        </Progress>
        <Progress value={value} variant="circle" size={96} className="relative">
          <ProgressCircle>
            <ProgressCircleTrack />
            <ProgressCircleRange />
          </ProgressCircle>
          <div className="absolute inset-0 flex items-center justify-center">
            <ProgressValue>{value}%</ProgressValue>
          </div>
        </Progress>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setValue((current) => Math.max(0, current - 10))}
          className="rounded border px-3 py-1 text-sm hover:bg-muted"
        >
          -10%
        </button>
        <button
          type="button"
          onClick={() => setValue((current) => Math.min(100, current + 10))}
          className="rounded border px-3 py-1 text-sm hover:bg-muted"
        >
          +10%
        </button>
      </div>
    </div>
  )
}
