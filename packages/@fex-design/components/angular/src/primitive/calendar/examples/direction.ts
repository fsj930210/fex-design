import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CalendarRoot } from '@fex-design/angular/primitive/calendar'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { ExampleContent } from './_parts/content'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
@Component({
  selector: 'calendar-direction-example',
  standalone: true,
  imports: [CalendarRoot, ExampleContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class DirectionExample {
  protected readonly date = calendarDemoDate
  protected readonly locale = {
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    year: 'Year',
    month: 'Month',
    datePanel: 'Month',
    monthPanel: 'Year',
    previous: 'Previous',
    next: 'Next',
    today: 'Today',
    week: 'Week',
    weekStartsOn: 0,
    firstWeekContainsDate: 1,
  } as const
  protected readonly rtlLocale = {
    ...this.locale,
    weekdays: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    months: [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ],
    year: 'السنة',
    month: 'الشهر',
    datePanel: 'الشهر',
    monthPanel: 'السنة',
    previous: 'السابق',
    next: 'التالي',
    today: 'اليوم',
    week: 'الأسبوع',
  }
  protected readonly rootClass = calendarUIRootClassName
  protected readonly ltrOptions = getCalendarUIOptions({
    defaultViewDate: this.date,
    locale: this.locale,
  })
  protected readonly rtlOptions = getCalendarUIOptions({
    defaultViewDate: this.date,
    locale: this.rtlLocale,
  })
}
