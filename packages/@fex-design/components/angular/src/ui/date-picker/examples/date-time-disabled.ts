import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  DatePicker,
  RangePicker,
  createDatePickerDateTime,
} from '@fex-design/angular/ui/date-picker'
import type { DatePickerDisabledTime } from '@fex-design/angular/primitive/date-picker'
@Component({
  selector: 'date-picker-date-time-disabled-example',
  standalone: true,
  imports: [DatePicker, RangePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-time-disabled.html',
})
export class DatePickerDateTimeDisabledExample {
  readonly initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0)
  readonly end = createDatePickerDateTime(2026, 10, 15, 17, 45, 0)
  readonly disabledTime: DatePickerDisabledTime = (date, info) => ({
    disabledHours: () =>
      date.day === 15
        ? Array.from({ length: info.activePart === 'end' ? 17 : 9 }, (_, hour) => hour)
        : [],
  })
}
