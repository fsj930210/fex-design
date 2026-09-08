import { For } from 'solid-js'
import { Input } from '@fex-design/solid/ui/input'
export function SizesExample() {
  return (
    <div class="grid w-full gap-3">
      <For each={['sm', 'md', 'lg'] as const}>
        {(size) => <Input size={size} placeholder={size} />}
      </For>
    </div>
  )
}
