import { PlusIcon } from '@fex-design/solid/icons/plus'
import { Button, ButtonIcon } from '@fex-design/solid/primitive/button'
import { buttonClassName } from '@fex-design/components-styles/button'
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
