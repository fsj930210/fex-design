import { NativeAttributesDirective, type NativeAttributes } from '@fex-design/angular/directives/native-attributes'
import { ChangeDetectionStrategy, Component, ElementRef, inject, contentChild, TemplateRef, input } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import type { CalendarCell as Cell, CalendarGrid as Grid, CalendarValue } from '@fex-design/core/calendar'
import { calendarGridClassName } from '@fex-design/components-styles/calendar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { CalendarRoot } from './calendar-root'
import { CalendarRow } from './calendar-row'
import { CalendarCell } from './calendar-cell'
@Component({ selector: 'div[calendarGrid]', standalone: true, imports: [NativeAttributesDirective, NgTemplateOutlet, CalendarRow, CalendarCell], changeDetection: ChangeDetectionStrategy.OnPush, host: { role: 'grid', 'data-slot': 'calendar-grid', '[attr.data-panel]': 'root.state().panel', '[class]': 'hostClassName()', '(mouseleave)': 'leave($event)' }, templateUrl: './calendar-grid.html' })
export class CalendarGrid<TValue extends CalendarValue = CalendarValue> {
  readonly rowProps = input<NativeAttributes>()
  readonly class = input<string | undefined>(undefined)
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly root = inject(CalendarRoot)
  readonly cellTemplate = contentChild<TemplateRef<{ $implicit: Cell<TValue>; cell: Cell<TValue> }>>(TemplateRef)
  readonly grid = () => this.root.grid() as Grid<TValue>
  rowKey(row: Cell<TValue>[]) { return row.map(cell => cell.key).join('|') }
  leave(event: MouseEvent) { if (!event.defaultPrevented) this.root.controller.clearHoveredRow() }
  protected readonly hostClassName = createHostClassName(() => calendarGridClassName, () => this.class())
}
