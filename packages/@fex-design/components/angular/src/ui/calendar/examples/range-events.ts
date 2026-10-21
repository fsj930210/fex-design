import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Calendar } from '@fex-design/angular/ui/calendar'
import { calendarDemoDate, calendarDemoEvent } from '@fex-design/docs-shared/calendar-demo-data'
@Component({
  selector: 'calendar-range-events-example',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './range-events.html',
})
export class RangeEventsExample {
  protected readonly date = calendarDemoDate
  protected readonly event = calendarDemoEvent
}
