import { For } from 'solid-js'
import { Button } from '@fex-design/solid/ui/button'

const sizes = [
  'xs',
  'sm',
  'default',
  'lg',
  'xl',
  'icon-xs',
  'icon-sm',
  'icon',
  'icon-lg',
  'icon-xl',
] as const

export function SizesExample() {
  return (
    <div class="flex flex-wrap items-center gap-3">
      <For each={sizes}>
        {(item) => (
          <Button size={item} aria-label={item}>
            {item}
          </Button>
        )}
      </For>
    </div>
  )
}
