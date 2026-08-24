import { Button } from '@fex-design/react/ui/button'

const variants = [
  'default',
  'outline',
  'secondary',
  'ghost',
  'destructive',
  'link',
  'dashed',
] as const

export function VariantsExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((item) => (
        <Button key={item} variant={item}>
          {item}
        </Button>
      ))}
    </div>
  )
}
