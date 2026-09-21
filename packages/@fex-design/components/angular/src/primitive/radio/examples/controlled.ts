import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  Radio,
  RadioButton,
  RadioGroup,
  type RadioValue,
} from '@fex-design/angular/primitive/radio'
import { Button } from '@fex-design/angular/primitive/button'

@Component({
  selector: 'radio-controlled-primitive-example',
  standalone: true,
  imports: [Button, Radio, RadioButton, RadioGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controlled.html',
})
export class RadioControlledExample {
  readonly value = signal<RadioValue>('pear')
}
