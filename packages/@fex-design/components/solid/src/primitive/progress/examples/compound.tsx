import {
  Progress,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/solid/primitive/progress'

export default function CompoundExample() {
  return (
    <div class="w-full max-w-md space-y-4">
      <Progress value={45}>
        <div class="flex items-center justify-between text-sm mb-1.5">
          <ProgressLabel>文件同步进度</ProgressLabel>
          <ProgressValue class="text-muted-foreground" />
        </div>
        <ProgressTrack>
          <ProgressRange class="bg-info" />
        </ProgressTrack>
      </Progress>
    </div>
  )
}
