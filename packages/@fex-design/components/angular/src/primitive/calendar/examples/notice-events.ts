import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CalendarRoot } from '@fex-design/angular/primitive/calendar'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { ExampleContent } from './_parts/content'
import { calendarDemoDate, calendarDemoNotices } from '@fex-design/docs-shared/calendar-demo-data'
@Component({ selector: 'calendar-notice-events-example', standalone: true, imports: [CalendarRoot, ExampleContent], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './notice-events.html' })
export class NoticeEventsExample {
  protected readonly date = calendarDemoDate
  protected readonly notices = calendarDemoNotices

  protected readonly rootClass = calendarUIRootClassName
  protected readonly options = getCalendarUIOptions({ defaultViewDate: this.date })
}
