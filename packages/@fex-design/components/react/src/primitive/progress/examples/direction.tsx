import {
  Progress,
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/react/primitive/progress'
function Direction({ dir }: { dir: 'ltr' | 'rtl' }) {
  return (
    <div dir={dir}>
      <Progress value={65} className="flex w-full flex-col">
        <div className="mb-1.5 flex w-full items-center justify-between text-sm">
          <ProgressLabel>{dir.toUpperCase()}</ProgressLabel>
          <ProgressValue>65%</ProgressValue>
        </div>
        <ProgressTrack>
          <ProgressRange />
        </ProgressTrack>
      </Progress>
    </div>
  )
}
function DirectionCircle({ dir }: { dir: 'ltr' | 'rtl' }) {
  return (
    <div dir={dir} className="grid justify-items-center gap-1 text-sm">
      <Progress value={65} variant="circle" size={96} className="relative">
        <ProgressCircle style={dir === 'rtl' ? { transform: 'scaleX(-1)' } : undefined}>
          <ProgressCircleTrack />
          <ProgressCircleRange />
        </ProgressCircle>
        <div className="absolute inset-0 flex items-center justify-center">
          <ProgressValue>65%</ProgressValue>
        </div>
      </Progress>
      <span>{dir === 'ltr' ? 'LTR（顺时针）' : 'RTL（反向）'}</span>
    </div>
  )
}
export function ProgressPrimitiveDirectionExample() {
  return (
    <div className="grid w-full max-w-md gap-5">
      <Direction dir="ltr" />
      <Direction dir="rtl" />
      <div className="flex items-start gap-6">
        <DirectionCircle dir="ltr" />
        <DirectionCircle dir="rtl" />
      </div>
    </div>
  )
}
