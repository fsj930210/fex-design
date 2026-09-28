import {
  Progress,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/react/primitive/progress'

export default function BasicExample() {
  return (
    <div className="w-full max-w-md grid gap-4">
      <Progress value={35} className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between text-sm mb-1.5">
          <ProgressLabel>Upload progress</ProgressLabel>
          <ProgressValue>35%</ProgressValue>
        </div>
        <div className="flex w-full items-center">
          <ProgressTrack className="min-w-0 flex-1">
            <ProgressRange />
          </ProgressTrack>
        </div>
      </Progress>
      <Progress value={65} className="flex w-full flex-col">
        <div className="flex w-full items-center">
          <ProgressTrack className="min-w-0 flex-1">
            <ProgressRange />
          </ProgressTrack>
          <ProgressValue className="ms-2 shrink-0 text-sm font-medium">65%</ProgressValue>
        </div>
      </Progress>
    </div>
  )
}
