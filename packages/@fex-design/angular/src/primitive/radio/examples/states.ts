import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Radio, RadioButton, RadioGroup } from '@fex-design/angular/primitive/radio'

@Component({
  selector: 'radio-states-primitive-example',
  standalone: true,
  imports: [Radio, RadioButton, RadioGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './states.html',
})
export class RadioStatesExample {
}
