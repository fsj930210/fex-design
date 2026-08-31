import { createSignal } from 'solid-js'
import { Badge } from '@fex-design/solid/ui/badge'
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
      <Badge count={0} showZero={showZero()}>
        <span class="block size-10 rounded bg-muted-background" />
      </Badge>
    </div>
  )
}
