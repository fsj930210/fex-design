import { getPickerAppearance } from './appearance-context'
import type { DatePickerCalendarProps } from './appearance.types'
import { getPickerCalendarProps } from '@fex-design/core/date-picker/safe-props'
import { DatePickerPanelContent } from './date-picker-panel-content'
import { cn } from '@fex-design/utils'

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  TemplateRef,
  viewChild,
  Injector,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import type { CalendarDate } from '@fex-design/core/calendar'
import { getGranularityByPicker } from '@fex-design/core/date-picker/panel'
import { datePickerPanelClassName } from '@fex-design/components-styles/date-picker'
import { CalendarRoot } from '@fex-design/angular/primitive/calendar'
import { RangePickerState } from './use-range-picker'
@Component({
  selector: 'div[rangePickerPanel]',
  standalone: true,
  imports: [DatePickerPanelContent, NgTemplateOutlet, CalendarRoot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  templateUrl: './range-picker-panel.html',
})
export class RangePickerPanel {
  readonly class = input<string>()
  readonly calendarProps = input<DatePickerCalendarProps>()
  protected readonly appearance = getPickerAppearance()
  readonly calendarAppearance = computed(() =>
    getPickerCalendarProps(this.calendarProps() ?? this.appearance().calendarProps),
  )
  readonly state = inject(RangePickerState)
  readonly context = computed(() => this.state.context())
  leave(event: MouseEvent) {
    if (!event.defaultPrevented) this.state.setHoverValue(null)
  }
  readonly disabledDate = (date: CalendarDate) =>
    this.context().disabledDate(date, this.context().activePart)
  readonly panelViewDate = input<CalendarDate>()
  readonly template = contentChild<TemplateRef<unknown>>(TemplateRef)
  readonly calendar = viewChild(CalendarRoot)
  readonly calendarInjector = viewChild('calendarElement', { read: Injector })
  // The wrapper uses display:contents; keep that host class off the real calendar.
  protected readonly panelClassName = computed(() =>
    cn(datePickerPanelClassName, this.calendarAppearance().class, this.class()),
  )
  protected readonly getGranularityByPicker = getGranularityByPicker
}
