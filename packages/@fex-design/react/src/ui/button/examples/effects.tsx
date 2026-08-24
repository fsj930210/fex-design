import { PlusIcon } from '@fex-design/react/icon/plus'
import { Button } from '@fex-design/react/ui/button'

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
    <div className="flex flex-wrap items-center gap-3">
      {effects.map((item) => (
        <Button key={item} effect={item} icon={<PlusIcon />}>
          {item}
        </Button>
      ))}
    </div>
  )
}
