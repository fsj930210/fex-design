import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core'
import { inputNumberDecrementClassName } from '@fex-design/components-styles/input-number'
import { buttonClassName } from '@fex-design/components-styles/button'
import { cn } from '@fex-design/utils'
import { MinusIcon } from '@fex-design/angular/icons/minus'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
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
