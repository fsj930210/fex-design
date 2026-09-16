import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core'
import { inputNumberIncrementClassName } from '@fex-design/styles/input-number'
import { buttonClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { PlusIcon } from '../../icon/plus'
import { createHostClassName } from '../../signals/host-class'
import { InputNumberRoot } from './input-number-root'
@Component({
  selector: 'button[inputNumberIncrement]',
  standalone: true,
  imports: [PlusIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    type: 'button',
    'data-slot': 'input-number-increment',
    'data-action': 'increment',
    'aria-label': 'Increase value',
    '[disabled]': '!root.inputNumber.canIncrement()',
  },
  template: '<ng-content><plus-icon /></ng-content>',
})
export class InputNumberIncrement {
  readonly root = inject(InputNumberRoot)
  protected readonly hostClassName = createHostClassName(() =>
    cn(buttonClassName({ variant: 'text' }), inputNumberIncrementClassName),
  )
  @HostListener('pointerdown', ['$event']) pointerdown(event: PointerEvent) {
    event.preventDefault()
  }
  @HostListener('click', ['$event']) click(event: MouseEvent) {
    if (!event.defaultPrevented) this.root.inputNumber.increment(event)
  }
}
