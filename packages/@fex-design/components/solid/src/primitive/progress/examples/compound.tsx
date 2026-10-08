import { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressRange } from '@fex-design/solid/primitive/progress'

export function ProgressPrimitiveCompoundExample() {

  return (
    <div class="w-full max-w-md space-y-4">
      <Progress value={45} class="w-full">
        <div class="flex items-center justify-between text-sm mb-1.5">
          <ProgressLabel>
            文件同步进度
          </ProgressLabel>
          <ProgressValue class="text-muted-foreground">
            45%
          </ProgressValue>
        </div>
        <ProgressTrack>
          <ProgressRange class="bg-info" />
        </ProgressTrack>
      </Progress>
    </div>
  )
}
