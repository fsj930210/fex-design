import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CalendarRoot } from '@fex-design/angular/primitive/calendar'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { ExampleContent } from './_parts/content'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
@Component({
  selector: 'calendar-custom-header-example',
  standalone: true,
  imports: [CalendarRoot, ExampleContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-header.html',
})
export class CustomHeaderExample {
  protected readonly date = calendarDemoDate

  protected readonly rootClass = calendarUIRootClassName
  protected readonly options = getCalendarUIOptions({ defaultViewDate: this.date })
}
