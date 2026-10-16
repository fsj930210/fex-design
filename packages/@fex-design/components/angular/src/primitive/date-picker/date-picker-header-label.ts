import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'
import { listenNativeEvent } from '@fex-design/angular/directives/listen-native-event'
import { getDatePickerHeaderLabel } from '@fex-design/core/date-picker/panel'
import { ChangeDetectionStrategy, booleanAttribute, Component, inject, input, signal } from '@angular/core'
import type { DatePickerHeaderLabelPart } from '@fex-design/core/date-picker/types'
import { getDatePickerHeaderLabelParts, getNextPanelByHeaderLabel } from '@fex-design/core/date-picker/panel'
import { datePickerHeaderLabelClassName } from '@fex-design/components-styles/date-picker'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { buttonPrimitiveClassName } from '../button/button'
import { CalendarRoot } from '../calendar'
import { getFooterOwner } from './date-picker-footer-owner'
@Component({ selector: 'button[datePickerHeaderLabel]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { 'data-slot': 'date-picker-header-label', type: 'button', '[class]': 'hostClassName()', '[attr.data-part]': 'part()', '[attr.data-hovered]': "hovered() ? 'true' : null", '[hidden]': 'hidden() || !visible()', '(mouseenter)': 'hovered.set(true)', '(mouseleave)': 'hovered.set(false)' }, templateUrl: './date-picker-header-label.html' })
export class DatePickerHeaderLabel {
  constructor() { listenNativeEvent('click', event => this.selectPanel(event)) }
  readonly hidden = input(false, { transform: booleanAttribute })
  readonly part = input.required<DatePickerHeaderLabelPart>()
  readonly hovered = signal(false)
  private readonly calendar = inject(CalendarRoot)
  private readonly owner = getFooterOwner()
  protected readonly hostClassName = createHostClassName(buttonPrimitiveClassName(datePickerHeaderLabelClassName))
  visible() { return getDatePickerHeaderLabelParts(this.owner.context().picker, this.calendar.state().panel).includes(this.part()) }
  label() { return getDatePickerHeaderLabel(this.calendar.state().viewDate, this.calendar.state().panel, this.part(), this.calendar.controller.getOptions().locale) }
  selectPanel(event: Event) { if (!isPickerActionBlocked(event)) this.calendar.controller.setPanel(getNextPanelByHeaderLabel(this.part())) }
}
