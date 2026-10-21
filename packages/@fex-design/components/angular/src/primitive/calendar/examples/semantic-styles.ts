import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  CalendarRoot,
  CalendarHeader,
  CalendarWeekHeader,
  CalendarGrid,
  CalendarCell,
  CalendarCellTrigger,
  CalendarFooter,
} from '@fex-design/angular/primitive/calendar'
import { getCalendarUIOptions, getCalendarUILocale } from '@fex-design/core/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
@Component({
  selector: 'calendar-semantic-styles-example',
  imports: [
    CalendarRoot,
    CalendarHeader,
    CalendarWeekHeader,
    CalendarGrid,
    CalendarCell,
    CalendarCellTrigger,
    CalendarFooter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class CalendarSemanticStylesExample {
  readonly date = calendarDemoDate
  readonly locale = getCalendarUILocale({})
}
