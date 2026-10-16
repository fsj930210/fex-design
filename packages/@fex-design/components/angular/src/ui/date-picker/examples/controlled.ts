import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { RangePicker } from '@fex-design/angular/ui/date-picker'
import { Button } from '@fex-design/angular/ui/button'
import type { CalendarRange } from '@fex-design/core/calendar'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'
@Component({ selector: 'date-picker-controlled-example', standalone: true, imports: [RangePicker, Button], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './controlled.html' })
export class DatePickerControlledExample {
readonly initialValue: CalendarRange = { start: createCalendarDate(2026, 10, 15), end: createCalendarDate(2026, 10, 22) }
readonly novemberValue: CalendarRange = { start: createCalendarDate(2026, 11, 5), end: createCalendarDate(2026, 11, 12) }
readonly value = signal<CalendarRange>(this.initialValue)
readonly open = signal<boolean>(false)
readonly uncontrolledValue = signal<CalendarRange>(this.initialValue)
setNovember() { this.value.set(this.novemberValue) }
resetValue() { this.value.set(this.initialValue) }
clearValue() { this.value.set({}) }
openPanel() { this.open.set(true) }
closePanel() { this.open.set(false) }
}
