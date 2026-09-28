import { useState } from "react"
import { Slider } from "@fex-design/react/ui/slider"
import { Progress } from "@fex-design/react/ui/progress"

export function ProgressCustomGapExample() {
  const [gap, setGap] = useState(2)
  return (
    <div className="grid w-full max-w-md gap-4">
      <label className="grid gap-2 text-sm"><span className="font-medium">分段间隔：{gap}px</span><Slider value={gap} min={0} max={8} step={1} onChange={(next) => setGap(typeof next === "number" ? next : next[0] ?? 2)} /></label>
      <div className="flex items-center gap-6">
        <Progress variant="circle" value={50} size={96} steps={8} gap={gap} color="var(--info)" linecap="butt" trackLinecap="butt" showInfo />
        <Progress variant="circle" value={100} size={96} steps={8} gap={gap} color="var(--success)" linecap="butt" trackLinecap="butt" success showInfo />
      </div>
    </div>
  )
}
