import type { ButtonColor, ButtonVariant } from '@fex-design/core/button/types'
import { buttonClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core'
import { createHostClassName } from '../../signals/host-class'

export function buttonPrimitiveClassName(className?: string) {
  return cn(buttonClassName(), className)
}

@Component({
  selector: 'button[button]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'button',
    '[attr.data-variant]': 'variant()',
    '[attr.data-color]': 'color()',
    type: 'button',
  },
  templateUrl: './button.html',
})
export class Button {
  readonly element = inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement
  readonly variant = input<ButtonVariant>('outlined')
  readonly color = input<ButtonColor>()
  protected readonly hostClassName = createHostClassName(() =>
    buttonClassName({ variant: this.variant(), color: this.color() }),
  )
}

export { ButtonGroup } from './button-group'
export { ButtonIcon } from './button-icon'
