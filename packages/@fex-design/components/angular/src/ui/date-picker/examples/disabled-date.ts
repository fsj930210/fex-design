import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker, RangePicker } from '@fex-design/angular/ui/date-picker'
import type { CalendarDate } from '@fex-design/core/calendar'
@Component({ selector: 'date-picker-disabled-date-example', standalone: true, imports: [DatePicker, RangePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './disabled-date.html' })
export class DatePickerDisabledDateExample {
readonly disabledWeekend = (date: CalendarDate) => date.dayOfWeek > 5
}
