import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RangePicker } from '@fex-design/angular/ui/date-picker'
import { getCalendarToday } from '@fex-design/core/calendar'
@Component({
  selector: 'date-picker-range-example',
  standalone: true,
  imports: [RangePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './range.html',
})
export class DatePickerRangeExample {
  readonly today = getCalendarToday()
}
