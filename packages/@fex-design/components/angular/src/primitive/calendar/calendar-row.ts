import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core'
import { calendarRowClassName } from '@fex-design/components-styles/calendar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { CalendarRoot } from './calendar-root'

@Component({
  selector: 'div[calendarRow]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'calendar-row',
    '[class]': 'hostClassName()',
    role: 'row',
    '[attr.data-panel]': 'root.state().panel',
  },
  template: '<ng-content />',
})
export class CalendarRow {
  readonly class = input<string | undefined>(undefined)
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly root = inject(CalendarRoot)

  protected readonly hostClassName = createHostClassName(
    () => calendarRowClassName,
    () => this.class(),
  )
}
