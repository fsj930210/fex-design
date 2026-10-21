import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Calendar } from '@fex-design/angular/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
@Component({
  selector: 'calendar-card-example',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.html',
})
export class CardExample {
  protected readonly date = calendarDemoDate
}
