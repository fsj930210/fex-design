import { getPickerAppearance } from './appearance-context'
import type { DatePickerCalendarProps } from './appearance.types'
import { getPickerCalendarProps } from '@fex-design/core/date-picker/safe-props'
import { DatePickerPanelContent } from './date-picker-panel-content'
import { cn } from '@fex-design/utils'

import { ChangeDetectionStrategy, Component, computed, contentChild, inject, input, TemplateRef, viewChild, Injector } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'

import { getGranularityByPicker } from '@fex-design/core/date-picker/panel'
import { datePickerPanelClassName } from '@fex-design/components-styles/date-picker'
import { CalendarRoot } from '@fex-design/angular/primitive/calendar'
import { DatePickerState } from './use-date-picker'
@Component({ selector: 'div[datePickerPanel]', standalone: true, imports: [DatePickerPanelContent, NgTemplateOutlet, CalendarRoot], changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'contents' }, templateUrl: './date-picker-panel.html' })
export class DatePickerPanel {
  readonly class = input<string>()
  readonly calendarProps = input<DatePickerCalendarProps>()
  protected readonly appearance = getPickerAppearance()
  readonly calendarAppearance = computed(() => getPickerCalendarProps(this.calendarProps() ?? this.appearance().calendarProps))
  readonly state = inject(DatePickerState)
  readonly context = computed(() => this.state.context())
  leave(event: MouseEvent) { if (!event.defaultPrevented) this.state.setHoverValue(null) }
  readonly template = contentChild<TemplateRef<unknown>>(TemplateRef)
  readonly calendar = viewChild(CalendarRoot)
  readonly calendarInjector = viewChild('calendarElement', { read: Injector })
  // The wrapper uses display:contents; keep that host class off the real calendar.
  protected readonly panelClassName = computed(() => cn(datePickerPanelClassName, this.calendarAppearance().class, this.class()))
  protected readonly getGranularityByPicker = getGranularityByPicker
}
