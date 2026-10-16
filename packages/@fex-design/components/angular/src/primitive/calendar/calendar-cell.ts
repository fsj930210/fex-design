import { ChangeDetectionStrategy, Component, ElementRef, inject, input, computed, contentChild, TemplateRef } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { getCalendarCellAttributes, type CalendarCell as Cell, type CalendarValue } from '@fex-design/core/calendar'
import { calendarCellContainerClassName, calendarCellClassName, calendarWeekRangeCellClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { CalendarRoot } from './calendar-root'
import { CalendarCellTrigger } from './calendar-cell-trigger'
@Component({ selector: 'div[calendarCell]', standalone: true, imports: [NgTemplateOutlet, CalendarCellTrigger], changeDetection: ChangeDetectionStrategy.OnPush, host: { role: 'gridcell', 'data-slot': 'calendar-cell', '[class]': 'hostClassName()', '[attr.aria-selected]': 'cell().state.selected', '[attr.aria-disabled]': 'cell().state.disabled', '[attr.data-today]': "attributes()['data-today']", '[attr.data-outside]': "attributes()['data-outside']", '[attr.data-selected]': "attributes()['data-selected']", '[attr.data-selected-above]': "attributes()['data-selected-above']", '[attr.data-selected-below]': "attributes()['data-selected-below']", '[attr.data-disabled]': "attributes()['data-disabled']", '[attr.data-range-picker]': "attributes()['data-range-picker']", '[attr.data-range-start]': "attributes()['data-range-start']", '[attr.data-range-end]': "attributes()['data-range-end']", '[attr.data-in-range]': "attributes()['data-in-range']", '[attr.data-week-selected]': "attributes()['data-week-selected']", '[attr.data-week-hover]': "attributes()['data-week-hover']", '[attr.data-week-row-start]': "attributes()['data-week-row-start']", '[attr.data-week-row-end]': "attributes()['data-week-row-end']", '[attr.data-week-start]': "attributes()['data-week-start']", '[attr.data-week-end]': "attributes()['data-week-end']", '[attr.data-week-range-start]': "attributes()['data-week-range-start']", '[attr.data-week-range-end]': "attributes()['data-week-range-end']", '[attr.data-week-range-single]': "attributes()['data-week-range-single']", '[attr.data-week-in-range]': "attributes()['data-week-in-range']", '[attr.data-week-range]': "attributes()['data-week-range']", '(mouseenter)': 'hover($event)' }, templateUrl: './calendar-cell.html' })
export class CalendarCell<TValue extends CalendarValue = CalendarValue> {
  readonly class = input<string | undefined>(undefined)
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly cell = input.required<Cell<TValue>>()
  readonly cellTemplate = contentChild<TemplateRef<{ $implicit: Cell<TValue>; cell: Cell<TValue> }>>(TemplateRef)
  private readonly root = inject(CalendarRoot)
  readonly attributes = computed(() => getCalendarCellAttributes(this.cell(), this.root.state().hoveredRowIndex, this.root.state().hasRange))
  hover(event: MouseEvent) { if (!event.defaultPrevented) this.root.controller.hoverCell(this.cell()) }
  protected readonly hostClassName = createHostClassName(() => cn(calendarCellContainerClassName, calendarCellClassName, this.cell().granularity === 'week' && calendarWeekRangeCellClassName), () => this.class())
}
