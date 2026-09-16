import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core'
import { inputClearClassName } from '@fex-design/styles/input'
import { CircleXIcon } from '../../icon/circle-x'
import { createHostClassName } from '../../signals/host-class'
import { InputNumberRoot } from './input-number-root'
@Component({
  selector: 'button[inputNumberClear]',
  standalone: true,
  imports: [CircleXIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'input-number-clear',
    type: 'button',
    '[hidden]': '!root.inputNumber.canClear()',
    '[disabled]': '!root.inputNumber.canClear()',
  },
  template: '<ng-content><circle-x-icon /></ng-content>',
})
export class InputNumberClear {
  readonly root = inject(InputNumberRoot)
  protected readonly hostClassName = createHostClassName(inputClearClassName)
  @HostListener('click', ['$event']) click(event: MouseEvent) {
    if (!event.defaultPrevented) {
      this.root.inputNumber.clear(event)
      this.root.focusControl()
    }
  }
}
