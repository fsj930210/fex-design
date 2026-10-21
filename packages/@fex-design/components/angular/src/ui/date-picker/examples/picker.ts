import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker, RangePicker } from '@fex-design/angular/ui/date-picker'
@Component({
  selector: 'date-picker-picker-example',
  standalone: true,
  imports: [DatePicker, RangePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './picker.html',
})
export class DatePickerPickerExample {}
