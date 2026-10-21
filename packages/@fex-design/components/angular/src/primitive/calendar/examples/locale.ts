import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CalendarRoot } from '@fex-design/angular/primitive/calendar'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { ExampleContent } from './_parts/content'
import { calendarDemoDate, calendarDemoEnglish } from '@fex-design/docs-shared/calendar-demo-data'
@Component({
  selector: 'calendar-locale-example',
  standalone: true,
  imports: [CalendarRoot, ExampleContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './locale.html',
})
export class LocaleExample {
  protected readonly date = calendarDemoDate
  protected readonly locale = calendarDemoEnglish

  protected readonly rootClass = calendarUIRootClassName
  protected readonly options = getCalendarUIOptions({
    defaultViewDate: this.date,
    locale: this.locale,
    showWeek: true,
  })
}
