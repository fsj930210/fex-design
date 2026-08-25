import { PlusIcon } from '@fex-design/solid/icon/plus'
import { Button, ButtonIcon } from '@fex-design/solid/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'
import { For } from 'solid-js'

const effects = [
  'expand-icon',
  'ring-hover',
  'shine-hover',
  'gooey-start',
  'gooey-end',
  'underline',
  'hover-underline',
  'press',
] as const

export function EffectsExample() {
  return (
    <div class="flex flex-wrap items-center gap-3">
      <For each={effects}>
        {(effect) => (
          <Button class={buttonClassName({ effect })} data-effect={effect}>
            <ButtonIcon>
              <PlusIcon />
            </ButtonIcon>
            {effect}
          </Button>
        )}
      </For>
    </div>
  )
}
