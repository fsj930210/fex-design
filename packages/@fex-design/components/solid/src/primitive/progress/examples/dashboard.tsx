import { Progress, ProgressCircle, ProgressCircleTrack, ProgressCircleRange, ProgressValue } from '@fex-design/solid/primitive/progress'

export function ProgressPrimitiveDashboardExample() {

  return (
    <div class="flex items-center gap-6">
      <Progress value={75} variant="dashboard" size={96} class="relative" thickness={4}>
        <ProgressCircle gapDegree={90} rotation={135}>
          <ProgressCircleTrack gapDegree={90} />
          <ProgressCircleRange gapDegree={90} />
        </ProgressCircle>
        <div class="absolute inset-0 flex items-center justify-center">
          <ProgressValue class="text-sm font-semibold">
            75%
          </ProgressValue>
        </div>
      </Progress>
      <Progress value={75} variant="dashboard" size={96} class="relative" thickness={4}>
        <ProgressCircle gapDegree={90} rotation={315}>
          <ProgressCircleTrack gapDegree={90} />
          <ProgressCircleRange gapDegree={90} />
        </ProgressCircle>
        <div class="absolute inset-0 flex items-center justify-center">
          <ProgressValue class="text-sm font-semibold">
            75%
          </ProgressValue>
        </div>
      </Progress>
    </div>
  )
}
