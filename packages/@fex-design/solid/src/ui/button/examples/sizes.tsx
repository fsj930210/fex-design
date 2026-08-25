import { For } from 'solid-js'
import { Button } from '@fex-design/solid/ui/button'
import { PlusIcon } from '@fex-design/solid/icon/plus'

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
    <div class="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4">
      <For each={sizes}>
        {(item) =>
          item.startsWith('icon') ? (
            <Button size={item} aria-label={item}>
              <PlusIcon />
            </Button>
          ) : (
            <Button size={item}>{item}</Button>
          )
        }
      </For>
      <Button class="h-12 px-6 text-base">custom</Button>
      <Button class="size-12 px-0" aria-label="custom icon size">
        <PlusIcon />
      </Button>
    </div>
  )
}
