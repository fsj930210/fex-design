import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter, createDatePickerDateTime } from '@fex-design/angular/primitive/date-picker'
@Component({ selector: 'date-picker-date-time-format-example', standalone: true, imports: [DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './date-time-format.html' })
export class DatePickerDateTimeFormatExample {
  readonly initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0)
}
