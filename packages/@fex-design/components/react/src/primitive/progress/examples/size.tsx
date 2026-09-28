import {
  Progress,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/react/primitive/progress'
export function ProgressPrimitiveSizeExample() {
  return (
    <div className="grid w-full max-w-md gap-3">
      {[
        [30, 4],
        [50, 8],
        [70, 12],
      ].map(([value, thickness]) => (
        <Progress key={value} value={value} thickness={thickness} className="flex w-full flex-col">
          <div className="flex w-full items-center">
            <ProgressTrack className="min-w-0 flex-1">
              <ProgressRange />
            </ProgressTrack>
            <ProgressValue className="ms-2 shrink-0 text-sm font-medium">{value}%</ProgressValue>
          </div>
        </Progress>
      ))}
    </div>
  )
}
