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
import { createCalendarDate } from '@fex-design/core/calendar/temporal'
@Component({
  selector: 'date-picker-disabled-example',
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
  templateUrl: './disabled.html',
})
export class DatePickerDisabledExample {
  readonly date = createCalendarDate(2026, 10, 15)
  readonly range = { start: this.date, end: this.date.add({ days: 7 }) }
}
