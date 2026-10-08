import { createSignal } from 'solid-js'
import { Progress } from '@fex-design/solid/ui/progress'
import { Slider } from '@fex-design/solid/ui/slider'

export function ProgressCustomGapExample() {
  const [gap, setGap] = createSignal(2)
  const changeGap = (next: number | number[]) => setGap(typeof next === 'number' ? next : next[0] ?? 2)
  return (
    <div class="grid w-full max-w-md gap-4">
      <label class="grid gap-2 text-sm">
        <span class="font-medium">
          分段间隔：{gap()}px
        </span>
        <Slider value={gap()} min={0} max={8} step={1} onChange={changeGap} />
      </label>
      <div class="flex items-center gap-6">
        <Progress
          variant="circle"
          value={50}
          size={96}
          steps={8}
          gap={gap()}
          color="var(--info)"
          linecap="butt"
          trackLinecap="butt"
          showInfo
        />
        <Progress
          variant="circle"
          value={100}
          size={96}
          steps={8}
          gap={gap()}
          color="var(--success)"
          linecap="butt"
          trackLinecap="butt"
          showInfo
          success
        />
      </div>
    </div>
  )
}
