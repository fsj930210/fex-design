import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker, RangePicker } from '@fex-design/angular/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'

@Component({
  selector: 'date-picker-direction-example', standalone: true, imports: [DatePicker, RangePicker],
  changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './direction.html',
})
export class DatePickerDirectionExample {
  readonly popupAppearance = {
    getPopupContainer: (reference: HTMLElement | null) => reference?.closest<HTMLElement>('[dir]') ?? document.body,
  }
  readonly date = createCalendarDate(2026, 10, 15)
  readonly range = { start: this.date, end: this.date.add({ days: 7 }) }
}
