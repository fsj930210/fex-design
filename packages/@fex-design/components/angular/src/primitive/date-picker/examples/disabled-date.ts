import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  RangePickerRoot,
  RangePickerTrigger,
  RangePickerContent,
  RangePickerPanelGroup,
  DatePickerFooter,
} from '@fex-design/angular/primitive/date-picker'
import type { CalendarDate } from '@fex-design/core/calendar'
@Component({
  selector: 'date-picker-disabled-date-example',
  standalone: true,
  imports: [
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    RangePickerRoot,
    RangePickerTrigger,
    RangePickerContent,
    RangePickerPanelGroup,
    DatePickerFooter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './disabled-date.html',
})
export class DatePickerDisabledDateExample {
  readonly disabledWeekend = (date: CalendarDate) => date.dayOfWeek > 5
}
