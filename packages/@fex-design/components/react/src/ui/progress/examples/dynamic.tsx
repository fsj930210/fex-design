import { useState } from "react"
import { Progress } from "@fex-design/react/ui/progress"

export function ProgressDynamicExample() {
  const [value, setValue] = useState(30)
  return (
    <div className="grid w-full max-w-md gap-4">
      <div className="flex items-center gap-6"><Progress value={value} /><Progress variant="circle" value={value} size={96} showInfo /></div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setValue((v) => Math.max(0, v - 10))}
          className="px-3 py-1 text-sm border rounded hover:bg-muted"
        >
          -10%
        </button>
        <button
          type="button"
          onClick={() => setValue((v) => Math.min(100, v + 10))}
          className="px-3 py-1 text-sm border rounded hover:bg-muted"
        >
          +10%
        </button>
      </div>
    </div>
  )
}
