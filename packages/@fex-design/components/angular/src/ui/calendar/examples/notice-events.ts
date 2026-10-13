import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Calendar } from '@fex-design/angular/ui/calendar'
import { calendarDemoDate, calendarDemoNotices } from '@fex-design/docs-shared/calendar-demo-data'
@Component({ selector: 'calendar-notice-events-example', standalone: true, imports: [Calendar], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './notice-events.html' })
export class NoticeEventsExample {
  protected readonly date = calendarDemoDate
  protected readonly notices = calendarDemoNotices
}
