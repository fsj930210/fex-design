import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core'
import { inputNumberDecrementClassName } from '@fex-design/styles/input-number'
import { buttonClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { MinusIcon } from '../../icon/minus'
import { createHostClassName } from '../../signals/host-class'
import { InputNumberRoot } from './input-number-root'
@Component({
  selector: 'button[inputNumberDecrement]',
  standalone: true,
  imports: [MinusIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    type: 'button',
    'data-slot': 'input-number-decrement',
    'data-action': 'decrement',
    'aria-label': 'Decrease value',
    '[disabled]': '!root.inputNumber.canDecrement()',
  },
  template: '<ng-content><minus-icon /></ng-content>',
})
export class InputNumberDecrement {
  readonly root = inject(InputNumberRoot)
  protected readonly hostClassName = createHostClassName(() =>
    cn(buttonClassName({ variant: 'text' }), inputNumberDecrementClassName),
  )
  @HostListener('pointerdown', ['$event']) pointerdown(event: PointerEvent) {
    event.preventDefault()
  }
  @HostListener('click', ['$event']) click(event: MouseEvent) {
    if (!event.defaultPrevented) this.root.inputNumber.decrement(event)
  }
}
