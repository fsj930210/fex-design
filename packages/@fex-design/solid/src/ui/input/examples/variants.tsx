import { For } from 'solid-js'
import { Input } from '@fex-design/solid/ui/input'
export function VariantsExample() {
  return (
    <div class="grid w-full gap-3">
      <For each={['outlined', 'filled', 'borderless', 'underlined'] as const}>
        {(variant) => <Input variant={variant} placeholder={variant} />}
      </For>
    </div>
  )
}
