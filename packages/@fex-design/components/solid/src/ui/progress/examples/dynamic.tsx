import { createSignal } from "solid-js"
import { Progress } from "@fex-design/solid/ui/progress"

export default function DynamicExample() {
  const [value, setValue] = createSignal(30)
  return (
    <div class="grid w-full max-w-md gap-4">
      <div class="flex items-center gap-6"><Progress value={value()} /><Progress variant="circle" value={value()} size={96} showInfo /></div>
      <div class="flex gap-2">
        <button
          type="button"
          onClick={() => setValue((prev) => Math.max(0, prev - 10))}
          class="px-3 py-1 text-sm border rounded hover:bg-muted"
        >
          -10%
        </button>
        <button
          type="button"
          onClick={() => setValue((prev) => Math.min(100, prev + 10))}
          class="px-3 py-1 text-sm border rounded hover:bg-muted"
        >
          +10%
        </button>
      </div>
    </div>
  )
}
