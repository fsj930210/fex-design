import { ChangeDetectionStrategy, Component, ElementRef, TemplateRef, computed, contentChild, contentChildren, inject, input } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { calendarHeaderClassName, calendarHeaderControlsClassName, calendarHeaderSelectClassName } from '@fex-design/components-styles/calendar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { CalendarRoot } from './calendar-root'
import { CalendarNavigationButton } from './calendar-navigation-button'
import { RadioGroup, RadioButton, type RadioValue } from '../radio'
import { SelectContent, SelectList, SelectRoot, SelectTrigger } from '../select'
import { getCalendarHeaderState, type CalendarHeaderState, type CalendarRenderContext } from '@fex-design/core/calendar'

@Component({ selector: 'div[calendarHeader]', standalone: true, imports: [NgTemplateOutlet, CalendarNavigationButton, RadioGroup, RadioButton, SelectRoot, SelectTrigger, SelectContent, SelectList], changeDetection: ChangeDetectionStrategy.OnPush, host: { 'data-slot': 'calendar-header', '[class]': 'hostClassName()' }, templateUrl: './calendar-header.html' })
export class CalendarHeader {
  readonly class = input<string | undefined>(undefined)
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly root = inject(CalendarRoot)
  readonly context = computed(() => getCalendarHeaderState(this.root.state(), this.root.controller))
  readonly renderTemplate = input<TemplateRef<CalendarRenderContext> | undefined>()
  readonly headerTemplate = contentChild<TemplateRef<CalendarHeaderState & { $implicit: CalendarHeaderState }>>(TemplateRef)
  readonly projectedElements = contentChildren(ElementRef, { descendants: true })
  readonly templateContext = () => { const state = this.context(); return { ...state, $implicit: state } }
  
  protected readonly hostClassName = createHostClassName(() => calendarHeaderClassName, () => this.class())
  readonly controlsClass = calendarHeaderControlsClassName
  readonly selectClass = calendarHeaderSelectClassName
  year(value: string | number | readonly (string | number)[] | undefined) { const next = Array.isArray(value) ? value[0] : value; if (next !== undefined) this.root.controller.setYear(Number(next)) }
  month(value: string | number | readonly (string | number)[] | undefined) { const next = Array.isArray(value) ? value[0] : value; if (next !== undefined) this.root.controller.setMonth(Number(next)) }
  panel(value: RadioValue) { if (value === 'date' || value === 'month') this.root.controller.setPanel(value) }
}
