import { For } from 'solid-js'
import { InputControl, InputRoot } from '@fex-design/solid/primitive/input'
export function VariantsExample() {
  return (
    <div class="grid w-full gap-3">
      <For each={['outlined', 'filled', 'borderless', 'underlined'] as const}>
        {(variant) => (
          <InputRoot variant={variant}>
            <InputControl placeholder={variant} />
          </InputRoot>
        )}
      </For>
    </div>
  )
}
