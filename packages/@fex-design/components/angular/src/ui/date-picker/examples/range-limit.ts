import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RangePicker } from '@fex-design/angular/ui/date-picker'
import type { CalendarDate } from '@fex-design/core/calendar'
import type { DatePickerDisabledDateInfo } from '@fex-design/core/date-picker/types'
import { getCalendarValueDate } from '@fex-design/core/calendar/value'
@Component({ selector: 'date-picker-range-limit-example', standalone: true, imports: [RangePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './range-limit.html' })
export class DatePickerRangeLimitExample {
readonly limitDays = (date: CalendarDate, info: DatePickerDisabledDateInfo) => {
    const from = info.from ? getCalendarValueDate(info.from) : null
    return Boolean(from && (date.toString() < from.subtract({ days: 6 }).toString() || date.toString() > from.add({ days: 6 }).toString()))
  }
readonly limitMonths = (date: CalendarDate, info: DatePickerDisabledDateInfo) => {
    const from = info.from ? getCalendarValueDate(info.from) : null
    return Boolean(from && Math.abs((date.year - from.year) * 12 + date.month - from.month) > 5)
  }
}
