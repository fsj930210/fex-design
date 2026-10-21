import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker } from '@fex-design/angular/ui/date-picker'
@Component({
  selector: 'date-picker-css-variables-example',
  standalone: true,
  imports: [DatePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class DatePickerCssVariablesExample {}
