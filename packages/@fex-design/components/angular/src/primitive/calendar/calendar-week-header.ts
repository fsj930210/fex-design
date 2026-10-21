import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { calendarWeekHeaderClassName } from '@fex-design/components-styles/calendar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import {
  getCalendarWeekHeaderItems,
  calendarDefaultWeekLabels,
  type CalendarWeekHeaderItem,
} from '@fex-design/core/calendar'
import { CalendarRoot } from './calendar-root'

@Component({
  selector: 'div[calendarWeekHeader]',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'calendar-week-header', '[class]': 'hostClassName()' },
  templateUrl: './calendar-week-header.html',
})
export class CalendarWeekHeader {
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly class = input<string | undefined>(undefined)
  readonly root = inject(CalendarRoot)
  readonly labels = input<readonly string[]>(calendarDefaultWeekLabels)
  readonly labelTemplate =
    contentChild<TemplateRef<CalendarWeekHeaderItem & { $implicit: CalendarWeekHeaderItem }>>(
      TemplateRef,
    )
  readonly items = computed(() =>
    getCalendarWeekHeaderItems(this.labels(), this.root.state().weekStartsOn),
  )
  protected readonly hostClassName = createHostClassName(
    () => calendarWeekHeaderClassName,
    () => this.class(),
  )
}
