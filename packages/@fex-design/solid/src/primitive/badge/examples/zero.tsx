import { createSignal } from 'solid-js'
import { Badge } from '@fex-design/solid/primitive/badge'
import { SwitchRoot, SwitchThumb } from '@fex-design/solid/primitive/switch'
export function Zero() {
  const [showZero, setShowZero] = createSignal(false)
  return (
    <div class="flex items-center gap-6">
      <label class="flex items-center gap-2">
        <SwitchRoot checked={showZero()} onCheckedChange={setShowZero} aria-label="显示 0">
          <SwitchThumb />
        </SwitchRoot>
        <span>显示 0</span>
      </label>
      <span class="relative inline-flex">
        <span class="block size-10 rounded bg-muted-background" />
        <Badge
          count={0}
          showZero={showZero()}
          class="absolute end-0 top-0 z-10 -translate-y-1/2 translate-x-1/2"
        />
      </span>
    </div>
  )
}
