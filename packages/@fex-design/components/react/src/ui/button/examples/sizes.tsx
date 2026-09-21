import { Button } from '@fex-design/react/ui/button'
import { PlusIcon } from '@fex-design/react/icons/plus'

const sizes = [
  'sm',
  'md',
  'lg',

  'icon-sm',
  'icon-md',
  'icon-lg',
] as const

export function SizesExample() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4">
      {sizes.map((item) =>
        item.startsWith('icon') ? (
          <Button key={item} size={item} aria-label={item}>
            <PlusIcon />
          </Button>
        ) : (
          <Button key={item} size={item}>
            {item}
          </Button>
        ),
      )}
      <Button className="h-12 px-6 text-base">custom</Button>
      <Button className="size-12 px-0" aria-label="custom icon size">
        <PlusIcon />
      </Button>
    </div>
  )
}
