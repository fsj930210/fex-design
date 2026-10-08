import { Progress, ProgressTrack, ProgressRange, ProgressValue } from '@fex-design/solid/primitive/progress'

export function ProgressPrimitiveSizeExample() {

  return (
    <div class="grid w-full max-w-md gap-3">
      <Progress value={30} thickness={4} class="flex w-full flex-col">
        <div class="flex w-full items-center">
          <ProgressTrack class="min-w-0 flex-1">
            <ProgressRange />
          </ProgressTrack>
          <ProgressValue class="ms-2 shrink-0 text-sm font-medium">
            30%
          </ProgressValue>
        </div>
      </Progress>
      <Progress value={50} thickness={8} class="flex w-full flex-col">
        <div class="flex w-full items-center">
          <ProgressTrack class="min-w-0 flex-1">
            <ProgressRange />
          </ProgressTrack>
          <ProgressValue class="ms-2 shrink-0 text-sm font-medium">
            50%
          </ProgressValue>
        </div>
      </Progress>
      <Progress value={70} thickness={12} class="flex w-full flex-col">
        <div class="flex w-full items-center">
          <ProgressTrack class="min-w-0 flex-1">
            <ProgressRange />
          </ProgressTrack>
          <ProgressValue class="ms-2 shrink-0 text-sm font-medium">
            70%
          </ProgressValue>
        </div>
      </Progress>
    </div>
  )
}
