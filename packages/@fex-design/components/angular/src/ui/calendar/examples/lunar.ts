import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Calendar } from '@fex-design/angular/ui/calendar'
import { calendarDemoDate, calendarDemoLunar } from '@fex-design/docs-shared/calendar-demo-data'
import { CalendarCellTrigger } from '@fex-design/angular/primitive/calendar'
@Component({
  selector: 'calendar-lunar-example',
  standalone: true,
  imports: [Calendar, CalendarCellTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lunar.html',
})
export class LunarExample {
  protected readonly date = calendarDemoDate
  protected readonly lunar = calendarDemoLunar
}
