import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  DatePickerFooter,
  RangePickerRoot,
  RangePickerTrigger,
  RangePickerContent,
  RangePickerPanelGroup,
  createDatePickerDateTime,
} from '@fex-design/angular/primitive/date-picker'
@Component({
  selector: 'date-picker-date-time-example',
  standalone: true,
  imports: [
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    DatePickerFooter,
    RangePickerRoot,
    RangePickerTrigger,
    RangePickerContent,
    RangePickerPanelGroup,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-time.html',
})
export class DatePickerDateTimeExample {
  readonly initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0)
  readonly end = createDatePickerDateTime(2026, 10, 15, 17, 45, 0)
}
