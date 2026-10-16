import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { DatePicker, createDatePickerDateTime } from '@fex-design/angular/ui/date-picker'
import type { DatePickerSelectionValue } from '@fex-design/angular/primitive/date-picker'
import { Button } from '@fex-design/angular/ui/button'
@Component({ selector: 'date-picker-date-time-controlled-example', standalone: true, imports: [DatePicker, Button], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './date-time-controlled.html' })
export class DatePickerDateTimeControlledExample {
  readonly initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0)
  readonly value = signal<DatePickerSelectionValue>(this.initial)
  readonly open = signal(false)
  setAfternoon() { this.value.set(createDatePickerDateTime(2026, 10, 16, 14, 45, 30)) }
}
