import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePickerFooter, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup } from '@fex-design/angular/primitive/date-picker'
import { getCalendarToday } from '@fex-design/core/calendar'
@Component({ selector: 'date-picker-range-example', standalone: true, imports: [DatePickerFooter, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './range.html' })
export class DatePickerRangeExample {
  readonly today = getCalendarToday()
  
}
