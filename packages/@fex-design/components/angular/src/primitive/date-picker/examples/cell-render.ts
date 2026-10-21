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
  selector: 'date-picker-cell-render-example',
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
  templateUrl: './cell-render.html',
})
export class DatePickerCellRenderExample {
  readonly date = createCalendarDate(2026, 10, 15)
}
