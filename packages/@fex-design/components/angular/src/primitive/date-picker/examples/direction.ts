import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter } from '@fex-design/angular/primitive/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'

@Component({
  selector: 'date-picker-direction-example', standalone: true, imports: [DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter],
  changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './direction.html',
})
export class DatePickerDirectionExample {
  readonly popupAppearance = {
    getPopupContainer: (reference: HTMLElement | null) => reference?.closest<HTMLElement>('[dir]') ?? document.body,
  }
  readonly date = createCalendarDate(2026, 10, 15)
  readonly range = { start: this.date, end: this.date.add({ days: 7 }) }
}
