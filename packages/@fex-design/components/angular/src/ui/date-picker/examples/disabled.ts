import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker, RangePicker } from '@fex-design/angular/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'
@Component({ selector: 'date-picker-disabled-example', standalone: true, imports: [DatePicker, RangePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './disabled.html' })
export class DatePickerDisabledExample {
readonly date = createCalendarDate(2026, 10, 15)
readonly range = { start: this.date, end: this.date.add({ days: 7 }) }
}
