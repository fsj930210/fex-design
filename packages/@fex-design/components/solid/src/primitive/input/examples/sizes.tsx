import { For } from 'solid-js'
import { InputControl, InputRoot } from '@fex-design/solid/primitive/input'
export function SizesExample() {
  return (
    <div class="grid w-full gap-3">
      <For each={['sm', 'md', 'lg'] as const}>
        {(size) => (
          <InputRoot size={size}>
            <InputControl placeholder={size} />
          </InputRoot>
        )}
      </For>
    </div>
  )
}
