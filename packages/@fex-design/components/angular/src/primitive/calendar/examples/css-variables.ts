import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  CalendarRoot,
  CalendarHeader,
  CalendarWeekHeader,
  CalendarGrid,
  CalendarCell,
  CalendarCellTrigger,
} from '@fex-design/angular/primitive/calendar'
import { getCalendarUIOptions, getCalendarUILocale } from '@fex-design/core/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
@Component({
  selector: 'calendar-css-variables-example',
  imports: [
    CalendarRoot,
    CalendarHeader,
    CalendarWeekHeader,
    CalendarGrid,
    CalendarCell,
    CalendarCellTrigger,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class CalendarCssVariablesExample {
  readonly date = calendarDemoDate
  readonly locale = getCalendarUILocale({})
}
