import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker, RangePicker, createDatePickerDateTime } from '@fex-design/angular/ui/date-picker'
@Component({ selector: 'date-picker-date-time-example', standalone: true, imports: [DatePicker, RangePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './date-time.html' })
export class DatePickerDateTimeExample {
  readonly initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0)
  readonly end = createDatePickerDateTime(2026, 10, 15, 17, 45, 0)
}
