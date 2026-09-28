import {
  Progress,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/react/primitive/progress'

export function ProgressPrimitiveFormatExample() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <Progress value={72} className="flex w-full flex-col">
        <div className="mb-1.5 flex w-full items-center justify-between text-sm">
          <ProgressLabel>存储空间</ProgressLabel>
          <ProgressValue>72 / 100 GB</ProgressValue>
        </div>
        <ProgressTrack>
          <ProgressRange />
        </ProgressTrack>
      </Progress>
      <Progress value={48} className="flex w-full flex-col">
        <div className="mb-1.5 flex w-full items-center justify-between text-sm">
          <ProgressLabel>处理中</ProgressLabel>
          <ProgressValue>48%</ProgressValue>
        </div>
        <ProgressTrack>
          <ProgressRange />
        </ProgressTrack>
      </Progress>
      <Progress value={84} className="flex w-full flex-col">
        <ProgressTrack>
          <ProgressRange />
        </ProgressTrack>
        <div className="mt-1.5 flex w-full items-center justify-between text-sm">
          <ProgressLabel>审核</ProgressLabel>
          <ProgressValue>84%</ProgressValue>
        </div>
      </Progress>
    </div>
  )
}
