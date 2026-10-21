import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Calendar } from '@fex-design/angular/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
@Component({
  selector: 'calendar-semantic-styles-example',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class SemanticStylesExample {
  protected readonly date = calendarDemoDate
}
