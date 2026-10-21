import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  computed,
  booleanAttribute,
  contentChild,
  TemplateRef,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { focusCalendarCell, type CalendarCell, type CalendarValue } from '@fex-design/core/calendar'
import { calendarCellTriggerClassName } from '@fex-design/components-styles/calendar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { cn } from '@fex-design/utils'
import { CalendarRoot } from './calendar-root'
@Component({
  selector: 'button[calendarCellTrigger]',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    'data-slot': 'calendar-cell-trigger',
    '[attr.data-key]': 'cell().key',
    '[tabIndex]': 'tabIndex()',
    '(focus)': 'focus($event)',
    '(keydown)': 'keydown($event)',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-pressed]': 'cell().state.selected',
    '[disabled]': 'disabled() || cell().state.disabled',
    '[class]': 'hostClassName()',
    '(click)': 'select($event)',
  },
  templateUrl: './calendar-cell-trigger.html',
})
export class CalendarCellTrigger<TValue extends CalendarValue = CalendarValue> {
  readonly class = input<string | undefined>(undefined)
  readonly element = inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement
  private readonly initialAriaLabel = this.element.getAttribute('aria-label')
  readonly ariaLabel = () => this.initialAriaLabel ?? this.cell().date.toString()
  readonly cell = input.required<CalendarCell<TValue>>()
  readonly cellTemplate =
    contentChild<TemplateRef<{ $implicit: CalendarCell<TValue>; cell: CalendarCell<TValue> }>>(
      TemplateRef,
    )
  readonly disabled = input(false, { transform: booleanAttribute })
  protected readonly root = inject(CalendarRoot)
  readonly tabIndex = computed(() => {
    this.root.state()
    return this.root.controller.getCellTabIndex(this.cell())
  })
  select(event: MouseEvent) {
    if (!event.defaultPrevented) this.root.controller.selectCell(this.cell())
  }
  focus(event: FocusEvent) {
    if (!event.defaultPrevented) this.root.controller.focusCell(this.cell())
  }
  keydown(event: KeyboardEvent) {
    if (event.defaultPrevented) return
    const target = this.root.controller.moveFocus(this.cell(), event.key)
    if (target) {
      event.preventDefault()
      focusCalendarCell(this.element, target.key)
    }
  }
  protected readonly hostClassName = createHostClassName(
    () => cn(calendarCellTriggerClassName, this.cell().state.today && 'focus-visible:ring-0'),
    () => this.class(),
  )
}
