import { ChangeDetectionStrategy, Component } from '@angular/core'
import { inputNumberActionsClassName } from '@fex-design/styles/input-number'
@Component({
  selector: 'span[inputNumberActions]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: inputNumberActionsClassName, 'data-slot': 'input-number-actions' },
  template: '<ng-content />',
})
export class InputNumberActions {}
