import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Calendar } from '@fex-design/angular/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
@Component({ selector: 'calendar-basic-example', standalone: true, imports: [Calendar], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class BasicExample {
  protected readonly date = calendarDemoDate
}
