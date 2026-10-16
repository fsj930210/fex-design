import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker, RangePicker } from '@fex-design/angular/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'
@Component({ selector: 'date-picker-constraints-example', standalone: true, imports: [DatePicker, RangePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './constraints.html' })
export class DatePickerConstraintsExample {
readonly min = createCalendarDate(2026, 10, 1)
readonly max = createCalendarDate(2026, 12, 31)
}
