import { createSignal } from 'solid-js'
import { Progress } from '@fex-design/solid/ui/progress'

export function ProgressDynamicExample() {
  const [value, setValue] = createSignal(30)
  const decrease = () => setValue(current => Math.max(0, current - 10))
  const increase = () => setValue(current => Math.min(100, current + 10))
  return (
    <div class="grid w-full max-w-md gap-4">
      <div class="flex items-center gap-6">
        <Progress value={value()} />
        <Progress variant="circle" value={value()} size={96} showInfo />
      </div>
      <div class="flex gap-2">
        <button type="button" class="px-3 py-1 text-sm border rounded hover:bg-muted" onClick={decrease}>
          -10%
        </button>
        <button type="button" class="px-3 py-1 text-sm border rounded hover:bg-muted" onClick={increase}>
          +10%
        </button>
      </div>
    </div>
  )
}
