import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  InputNumberRoot,
  InputNumberControl,
  InputNumberClear,
  InputNumberActions,
  InputNumberIncrement,
  InputNumberDecrement,
} from '@fex-design/angular/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/angular/primitive/input'
import {
  inputNumberStyleDemo as demo,
  inputNumberSemanticClasses as classNames,
} from '@fex-design/docs-shared/input-number-demo'

@Component({
  selector: 'input-number-semantic-styles-example',
  standalone: true,
  imports: [
    InputNumberRoot,
    InputNumberControl,
    InputNumberClear,
    InputNumberActions,
    InputNumberIncrement,
    InputNumberDecrement,
    InputPrefix,
    InputSuffix,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class InputNumberSemanticStylesExample {
  readonly demo = demo
  readonly classNames = classNames
}
