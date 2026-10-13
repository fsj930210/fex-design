import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Calendar } from '@fex-design/angular/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
@Component({ selector: 'calendar-week-example', standalone: true, imports: [Calendar], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './week.html' })
export class WeekExample {
  protected readonly date = calendarDemoDate
}
