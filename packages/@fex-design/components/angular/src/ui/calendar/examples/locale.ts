import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Calendar } from '@fex-design/angular/ui/calendar'
import { calendarDemoDate, calendarDemoEnglish } from '@fex-design/docs-shared/calendar-demo-data'
@Component({
  selector: 'calendar-locale-example',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './locale.html',
})
export class LocaleExample {
  protected readonly date = calendarDemoDate
  protected readonly locale = calendarDemoEnglish
}
