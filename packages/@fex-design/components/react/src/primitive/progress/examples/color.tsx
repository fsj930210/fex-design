import { type ReactNode } from 'react'
import {
  Progress,
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/react/primitive/progress'
function Line({ value, children }: { value: number; children: ReactNode }) {
  return (
    <Progress value={value} className="inline-flex items-center gap-2">
      <ProgressTrack className="w-full bg-[#cffafe]">
        <ProgressRange className="bg-[#7c3aed]" />
      </ProgressTrack>
      <ProgressValue>{children}</ProgressValue>
    </Progress>
  )
}
export function ProgressPrimitiveColorExample() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <Line value={45}>45%</Line>
      <Progress value={75} className="inline-flex items-center gap-2">
        <ProgressTrack>
          <ProgressRange className="bg-[linear-gradient(to_right,_#1677ff_0%,_#87d068_100%)]" />
        </ProgressTrack>
        <ProgressValue>75%</ProgressValue>
      </Progress>
      <div className="flex gap-4">
        <Progress value={60} variant="circle" size={96} className="relative">
          <ProgressCircle>
            <ProgressCircleTrack />
            <ProgressCircleRange className="text-[#7c3aed]" />
          </ProgressCircle>
          <div className="absolute inset-0 flex items-center justify-center">
            <ProgressValue className="text-sm">60%</ProgressValue>
          </div>
        </Progress>
      </div>
    </div>
  )
}
