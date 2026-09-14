import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Radio, RadioButton, RadioGroup } from '@fex-design/angular/primitive/radio'

@Component({
  selector: 'radio-sizes-primitive-example',
  standalone: true,
  imports: [Radio, RadioButton, RadioGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sizes.html',
})
export class RadioSizesExample {
}
