import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Calendar } from '@fex-design/angular/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
import { signal } from '@angular/core'
import type { CalendarDate } from '@fex-design/core/calendar'
@Component({ selector: 'calendar-selection-example', standalone: true, imports: [Calendar], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './selection.html' })
export class SelectionExample {
  protected readonly date = calendarDemoDate
  protected readonly value = signal<CalendarDate | null>(null)
}
