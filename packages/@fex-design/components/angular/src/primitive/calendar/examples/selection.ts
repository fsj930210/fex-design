import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CalendarRoot } from '@fex-design/angular/primitive/calendar'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { ExampleContent } from './_parts/content'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
import { computed, signal } from '@angular/core'
import type { CalendarDate } from '@fex-design/core/calendar'
@Component({
  selector: 'calendar-selection-example',
  standalone: true,
  imports: [CalendarRoot, ExampleContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selection.html',
})
export class SelectionExample {
  protected readonly date = calendarDemoDate
  protected readonly value = signal<CalendarDate | null>(null)

  protected readonly rootClass = calendarUIRootClassName
  protected readonly options = computed(() =>
    getCalendarUIOptions({ defaultViewDate: this.date, value: this.value() }),
  )
}
