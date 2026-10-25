import { ChangeDetectionStrategy, Component, HostListener, inject, input } from '@angular/core'
import { inputNumberIncrementClassName } from '@fex-design/components-styles/input-number'
import { buttonClassName } from '@fex-design/components-styles/button'
import { cn } from '@fex-design/utils'
import { PlusIcon } from '@fex-design/angular/icons/plus'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
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
  template: '<ng-content><svg plusIcon class="size-(--button-icon-size)" ></svg></ng-content>',
})
export class InputNumberIncrement {
  readonly class = input<string>()
  readonly root = inject(InputNumberRoot)
  protected readonly hostClassName = createHostClassName(
    () => cn(buttonClassName({ variant: 'text' }), inputNumberIncrementClassName),
    () => this.class(),
  )
  @HostListener('pointerdown', ['$event']) pointerdown(event: PointerEvent) {
    event.preventDefault()
  }
  @HostListener('click', ['$event']) click(event: MouseEvent) {
    if (!event.defaultPrevented) this.root.inputNumber.increment(event)
  }
}
