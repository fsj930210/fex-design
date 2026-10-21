import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker, RangePicker } from '@fex-design/angular/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'
@Component({
  selector: 'date-picker-cell-render-example',
  standalone: true,
  imports: [DatePicker, RangePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cell-render.html',
})
export class DatePickerCellRenderExample {
  readonly date = createCalendarDate(2026, 10, 15)
}
