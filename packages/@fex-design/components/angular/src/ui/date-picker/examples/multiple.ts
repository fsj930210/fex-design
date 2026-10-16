import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker } from '@fex-design/angular/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'

@Component({ selector: 'date-picker-multiple-example', standalone: true, imports: [DatePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './multiple.html' })
export class DatePickerMultipleExample {
  readonly values = [5, 6, 7, 12, 13, 19, 26].map(day => createCalendarDate(2026, 10, day))
}
