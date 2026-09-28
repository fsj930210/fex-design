import {
  Progress,
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/react/primitive/progress'
export function ProgressPrimitiveGradientExample() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <Progress value={90} className="inline-flex items-center gap-2">
        <ProgressTrack>
          <ProgressRange className="bg-[linear-gradient(to_right,_#1677ff,_#87d068)]" />
        </ProgressTrack>
        <ProgressValue>90%</ProgressValue>
      </Progress>
      <div className="flex items-center gap-6">
        <Progress value={90} variant="circle" size={96} className="relative">
          <ProgressCircle>
            <defs>
              <linearGradient id="progress-gradient-circle" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1677ff" />
                <stop offset="100%" stopColor="#87d068" />
              </linearGradient>
            </defs>
            <ProgressCircleTrack />
            <ProgressCircleRange stroke="url(#progress-gradient-circle)" />
          </ProgressCircle>
          <div className="absolute inset-0 flex items-center justify-center">
            <ProgressValue>90%</ProgressValue>
          </div>
        </Progress>
        <Progress value={90} variant="dashboard" size={96} className="relative">
          <ProgressCircle gapDegree={90}>
            <defs>
              <linearGradient id="progress-gradient-dashboard" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1677ff" />
                <stop offset="100%" stopColor="#87d068" />
              </linearGradient>
            </defs>
            <ProgressCircleTrack gapDegree={90} />
            <ProgressCircleRange gapDegree={90} stroke="url(#progress-gradient-dashboard)" />
          </ProgressCircle>
          <div className="absolute inset-0 flex items-center justify-center">
            <ProgressValue>90%</ProgressValue>
          </div>
        </Progress>
      </div>
    </div>
  )
}
