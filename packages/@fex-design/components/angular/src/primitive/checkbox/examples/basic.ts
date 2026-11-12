import { ChangeDetectionStrategy, Component, input, booleanAttribute } from '@angular/core'
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
} from '@fex-design/angular/primitive/checkbox'

@Component({
  selector: 'checkbox-primitive-basic-example',
  standalone: true,
  imports: [CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class CheckboxPrimitiveBasicExample {
  readonly invalid = input(false, { transform: booleanAttribute })
}
