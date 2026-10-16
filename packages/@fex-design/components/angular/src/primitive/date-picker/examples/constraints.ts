import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter } from '@fex-design/angular/primitive/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'
@Component({ selector: 'date-picker-constraints-example', standalone: true, imports: [DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './constraints.html' })
export class DatePickerConstraintsExample {
readonly min = createCalendarDate(2026, 10, 1)
readonly max = createCalendarDate(2026, 12, 31)
}
