import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { signal } from '@angular/core'
import { DatePicker, RangePicker } from '@fex-design/angular/ui/date-picker'
import { DatePickerFooter, DatePickerPreset, type DatePickerSelectionValue } from '@fex-design/angular/primitive/date-picker'
import { getCalendarToday, type CalendarRange } from '@fex-design/core/calendar'
@Component({ selector: 'date-picker-presets-example', standalone: true, imports: [NgTemplateOutlet, DatePicker, RangePicker, DatePickerFooter, DatePickerPreset], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './presets.html' })
export class DatePickerPresetsExample {
readonly value = signal<DatePickerSelectionValue>(null)
readonly range = signal<CalendarRange>({})
readonly dateOpen = signal<boolean>(false)
readonly rangeOpen = signal<boolean>(false)
chooseDate(days: number) {
  this.value.set(getCalendarToday().add({ days }))
  this.dateOpen.set(false)
}
chooseRange(preset: 'week' | 'month') {
  const today = getCalendarToday()
  const start = preset === 'week' ? today.subtract({ days: 6 }) : today.with({ day: 1 })
  const end = preset === 'week' ? today : start.add({ months: 1 }).subtract({ days: 1 })
  this.range.set({ start, end })
  this.rangeOpen.set(false)
}
}
