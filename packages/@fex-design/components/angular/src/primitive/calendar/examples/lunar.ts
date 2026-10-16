import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CalendarRoot, CalendarCellTrigger } from '@fex-design/angular/primitive/calendar'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { ExampleContent } from './_parts/content'
import { calendarDemoDate, calendarDemoLunar } from '@fex-design/docs-shared/calendar-demo-data'

@Component({ selector: 'calendar-lunar-example', standalone: true, imports: [CalendarRoot, ExampleContent, CalendarCellTrigger], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './lunar.html' })
export class LunarExample {
  protected readonly date = calendarDemoDate
  protected readonly lunar = calendarDemoLunar

  protected readonly rootClass = calendarUIRootClassName
  protected readonly options = getCalendarUIOptions({ defaultViewDate: this.date })
}
