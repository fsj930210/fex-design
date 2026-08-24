import { buttonPrimitiveClassName as buttonPrimitiveStyleClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core'
import { createHostClassName } from '../../signals/host-class'

export function buttonPrimitiveClassName(className?: string) {
  return cn(buttonPrimitiveStyleClassName, className)
}

@Component({
  selector: 'button[button]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'button',
    type: 'button',
  },
  templateUrl: './button.html',
})
export class Button {
  readonly element = inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement
  protected readonly hostClassName = createHostClassName(buttonPrimitiveClassName())
}

export { ButtonGroup } from './button-group'
export { ButtonIcon } from './button-icon'
