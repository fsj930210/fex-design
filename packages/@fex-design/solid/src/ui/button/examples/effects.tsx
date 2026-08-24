import { For } from 'solid-js'
import { PlusIcon } from '@fex-design/solid/icon/plus'
import { Button } from '@fex-design/solid/ui/button'

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
        {(item) => (
          <Button effect={item} icon={<PlusIcon />}>
            {item}
          </Button>
        )}
      </For>
    </div>
  )
}
