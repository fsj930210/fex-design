import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InputNumber } from '@fex-design/angular/ui/input-number'
import {
  inputNumberStyleDemo as demo,
  inputNumberSemanticClasses as classNames,
} from '@fex-design/docs-shared/input-number-demo'

@Component({
  selector: 'input-number-semantic-styles-example',
  standalone: true,
  imports: [InputNumber],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class InputNumberSemanticStylesExample {
  readonly demo = demo
  readonly classNames = classNames
}
