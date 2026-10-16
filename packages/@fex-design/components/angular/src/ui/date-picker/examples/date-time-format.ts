import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker, createDatePickerDateTime } from '@fex-design/angular/ui/date-picker'
@Component({ selector: 'date-picker-date-time-format-example', standalone: true, imports: [DatePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './date-time-format.html' })
export class DatePickerDateTimeFormatExample {
  readonly initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0)
}
