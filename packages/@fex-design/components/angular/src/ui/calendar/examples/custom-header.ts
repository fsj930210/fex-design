import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Calendar } from '@fex-design/angular/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
@Component({ selector: 'calendar-custom-header-example', standalone: true, imports: [Calendar], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './custom-header.html' })
export class CustomHeaderExample {
  protected readonly date = calendarDemoDate
}
