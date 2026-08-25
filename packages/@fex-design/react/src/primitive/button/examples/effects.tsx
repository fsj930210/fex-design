import { PlusIcon } from '@fex-design/react/icon/plus'
import { Button, ButtonIcon } from '@fex-design/react/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'

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
      {effects.map((effect) => (
        <Button key={effect} className={buttonClassName({ effect })} data-effect={effect}>
          <ButtonIcon>
            <PlusIcon />
          </ButtonIcon>
          {effect}
        </Button>
      ))}
    </div>
  )
}
