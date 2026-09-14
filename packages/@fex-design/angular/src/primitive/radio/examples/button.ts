import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RadioButton, RadioGroup } from '@fex-design/angular/primitive/radio'

@Component({
  selector: 'radio-button-primitive-example',
  standalone: true,
  imports: [RadioButton, RadioGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.html',
})
export class RadioButtonExample {
}
