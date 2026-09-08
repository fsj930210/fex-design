import { Button, ButtonIcon } from '@fex-design/solid/primitive/button'
import { PlusIcon } from '@fex-design/solid/icon/plus'
import { buttonClassName } from '@fex-design/styles/button'
import { For } from 'solid-js'

export function SizesExample() {
  return (
    <div class="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4">
      <For
        each={
          [
              'sm',
            'md',
            'lg',
                'icon-sm',
            'icon-md',
            'icon-lg',
            ] as const
        }
      >
        {(size) => (
          <Button class={buttonClassName({ size })} aria-label={size}>
            {size.startsWith('icon') ? (
              <ButtonIcon>
                <PlusIcon />
              </ButtonIcon>
            ) : (
              size
            )}
          </Button>
        )}
      </For>
      <Button class="h-12 px-6 text-base">custom</Button>
      <Button class="size-12 px-0" aria-label="custom icon size">
        <ButtonIcon>
          <PlusIcon />
        </ButtonIcon>
      </Button>
    </div>
  )
}
