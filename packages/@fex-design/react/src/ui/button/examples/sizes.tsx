import { Button } from '@fex-design/react/ui/button'

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
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((item) => (
        <Button key={item} size={item} aria-label={item}>
          {item}
        </Button>
      ))}
    </div>
  )
}
