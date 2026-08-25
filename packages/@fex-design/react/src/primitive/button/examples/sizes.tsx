import { Button, ButtonIcon } from '@fex-design/react/primitive/button'
import { PlusIcon } from '@fex-design/react/icon/plus'
import { buttonClassName } from '@fex-design/styles/button'

export function SizesExample() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4">
      {(
        [
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
      ).map((size) => (
        <Button key={size} className={buttonClassName({ size })} aria-label={size}>
          {size.startsWith('icon') ? (
            <ButtonIcon>
              <PlusIcon />
            </ButtonIcon>
          ) : (
            size
          )}
        </Button>
      ))}
      <Button className="h-12 px-6 text-base">custom</Button>
      <Button className="size-12 px-0" aria-label="custom icon size">
        <ButtonIcon>
          <PlusIcon />
        </ButtonIcon>
      </Button>
    </div>
  )
}
