import { createSignal } from 'solid-js'
import { Progress, ProgressTrack, ProgressRange, ProgressValue, ProgressCircle, ProgressCircleTrack, ProgressCircleRange } from '@fex-design/solid/primitive/progress'

export function ProgressPrimitiveDynamicExample() {
  const [value, setValue] = createSignal(30)
  const decrease = () => setValue(current => Math.max(0, current - 10))
  const increase = () => setValue(current => Math.min(100, current + 10))
  return (
    <div class="grid w-full max-w-md gap-4">
      <div class="flex items-center gap-6">
        <Progress value={value()} class="flex min-w-0 flex-1 flex-col">
          <div class="flex w-full items-center">
            <ProgressTrack class="min-w-0 flex-1">
              <ProgressRange />
            </ProgressTrack>
            <ProgressValue class="ms-2 shrink-0 text-sm">
              {value()}%
            </ProgressValue>
          </div>
        </Progress>
        <Progress value={value()} variant="circle" size={96} class="relative">
          <ProgressCircle>
            <ProgressCircleTrack />
            <ProgressCircleRange />
          </ProgressCircle>
          <div class="absolute inset-0 flex items-center justify-center">
            <ProgressValue>
              {value()}%
            </ProgressValue>
          </div>
        </Progress>
      </div>
      <div class="flex gap-2">
        <button type="button" class="rounded border px-3 py-1 text-sm hover:bg-muted" onClick={decrease}>
          -10%
        </button>
        <button type="button" class="rounded border px-3 py-1 text-sm hover:bg-muted" onClick={increase}>
          +10%
        </button>
      </div>
    </div>
  )
}
