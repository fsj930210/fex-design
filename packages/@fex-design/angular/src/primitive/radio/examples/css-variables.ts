import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Radio, RadioButton, RadioGroup } from '@fex-design/angular/primitive/radio'

@Component({
  selector: 'radio-css-variables-primitive-example',
  standalone: true,
  imports: [Radio, RadioButton, RadioGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class RadioCssVariablesExample {
}
