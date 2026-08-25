import { Button } from '@fex-design/react/ui/button'
import { PlusIcon } from '@fex-design/react/icon/plus'

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
