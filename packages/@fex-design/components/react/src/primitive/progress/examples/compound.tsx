import {
  Progress,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/react/primitive/progress'

export default function CompoundExample() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Progress value={45} className="w-full">
        <div className="flex items-center justify-between text-sm mb-1.5">
          <ProgressLabel>文件同步进度</ProgressLabel>
          <ProgressValue className="text-muted-foreground">45%</ProgressValue>
        </div>
        <ProgressTrack>
          <ProgressRange className="bg-info" />
        </ProgressTrack>
      </Progress>
    </div>
  )
}
