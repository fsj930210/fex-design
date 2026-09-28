import {
  Progress,
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressValue,
} from '@fex-design/react/primitive/progress'
function Dashboard({ rotation }: { rotation?: number }) {
  return (
    <Progress
      variant="dashboard"
      value={75}
      size={96}
      thickness={4}
      gapDegree={90}
      className="relative"
    >
      <ProgressCircle gapDegree={90} rotation={rotation}>
        <ProgressCircleTrack gapDegree={90} />
        <ProgressCircleRange gapDegree={90} />
      </ProgressCircle>
      <div className="absolute inset-0 flex items-center justify-center">
        <ProgressValue className="text-sm font-semibold">75%</ProgressValue>
      </div>
    </Progress>
  )
}
export function ProgressPrimitiveDashboardExample() {
  return (
    <div className="flex items-center gap-6">
      <Dashboard rotation={135} />
      <Dashboard rotation={315} />
    </div>
  )
}
