import {
  Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressRange,
  ProgressCircle,
  ProgressCircleTrack,
  ProgressCircleRange,
} from '@fex-design/react/primitive/progress'
export function ProgressSemanticStylesExample() {
  return (
    <div className="grid w-full max-w-xl gap-6">
      <Progress value={72} thickness={12} className="flex flex-col w-full">
        <div className="flex items-center justify-between text-sm mb-1.5 w-full font-semibold">
          <ProgressLabel>上传文件</ProgressLabel>
          <span className="text-violet-600">72%</span>
        </div>
        <div className="flex w-full items-center">
          <ProgressTrack className="min-w-0 flex-1 rounded-md">
            <ProgressRange
              className="rounded-md"
              style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7)' }}
            ></ProgressRange>
          </ProgressTrack>
        </div>
      </Progress>
      <div className="flex flex-wrap items-center gap-6">
        <Progress
          value={72}
          size={96}
          variant="circle"
          className="relative inline-flex items-center justify-center rounded-full bg-muted/30 p-2"
        >
          <ProgressCircle>
            <ProgressCircleTrack></ProgressCircleTrack>
            <ProgressCircleRange className="text-violet-600"></ProgressCircleRange>
          </ProgressCircle>
          <div className="absolute inset-0 flex items-center justify-center font-medium">72%</div>
        </Progress>
        <Progress
          value={72}
          size={96}
          variant="dashboard"
          className="relative inline-flex items-center justify-center rounded-full bg-muted/30 p-2"
        >
          <ProgressCircle gapDegree={90}>
            <ProgressCircleTrack gapDegree={90}></ProgressCircleTrack>
            <ProgressCircleRange gapDegree={90} className="text-violet-600"></ProgressCircleRange>
          </ProgressCircle>
          <div className="absolute inset-0 flex items-center justify-center font-medium">72%</div>
        </Progress>
      </div>
    </div>
  )
}
