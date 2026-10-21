import { ChangeDetectionStrategy, Component, HostListener, inject, input } from '@angular/core'
import { inputClearClassName } from '@fex-design/components-styles/input'
import { CircleXIcon } from '@fex-design/angular/icons/circle-x'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
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
  template: '<ng-content><circle-x-icon class="size-(--input-clear-icon-size)" /></ng-content>',
})
export class InputNumberClear {
  readonly class = input<string>()
  readonly root = inject(InputNumberRoot)
  protected readonly hostClassName = createHostClassName(inputClearClassName, () => this.class())
  @HostListener('click', ['$event']) click(event: MouseEvent) {
    if (!event.defaultPrevented) {
      this.root.inputNumber.clear(event)
      this.root.focusControl()
    }
  }
}
