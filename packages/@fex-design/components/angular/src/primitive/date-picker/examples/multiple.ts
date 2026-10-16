import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter } from '@fex-design/angular/primitive/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'

@Component({ selector: 'date-picker-multiple-example', standalone: true, imports: [DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './multiple.html' })
export class DatePickerMultipleExample {
  readonly values = [5, 6, 7, 12, 13, 19, 26].map(day => createCalendarDate(2026, 10, day))
}
