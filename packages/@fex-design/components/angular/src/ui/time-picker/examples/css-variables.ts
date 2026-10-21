import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePicker } from '@fex-design/angular/ui/time-picker'
@Component({
  selector: 'time-picker-css-variables-example',
  standalone: true,
  imports: [TimePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class TimePickerCssVariablesExample {}
