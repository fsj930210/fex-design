import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { inputNumberActionsClassName } from '@fex-design/components-styles/input-number'
@Component({
  selector: 'span[inputNumberActions]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'input-number-actions' },
  template: '<ng-content />',
})
export class InputNumberActions {
  readonly class = input<string>()
  protected readonly hostClassName = createHostClassName(inputNumberActionsClassName, () =>
    this.class(),
  )
}
