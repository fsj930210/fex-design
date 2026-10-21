import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InputNumber } from '@fex-design/angular/ui/input-number'
import {
  inputNumberStyleDemo as demo,
  inputNumberVariableClasses as classNames,
} from '@fex-design/docs-shared/input-number-demo'

@Component({
  selector: 'input-number-css-variables-example',
  standalone: true,
  imports: [InputNumber],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class InputNumberCssVariablesExample {
  readonly demo = demo
  readonly classNames = classNames
}
