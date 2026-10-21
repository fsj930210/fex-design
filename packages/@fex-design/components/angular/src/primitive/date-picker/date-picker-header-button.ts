import { getDatePickerHeaderActionLabel } from '@fex-design/core/date-picker/panel'
import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'
import { listenNativeEvent } from '@fex-design/angular/directives/listen-native-event'
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import type { DatePickerHeaderAction } from '@fex-design/core/date-picker/types'
import { datePickerHeaderNavigationClassName } from '@fex-design/components-styles/date-picker'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { ChevronLeftIcon } from '@fex-design/angular/icons/chevron-left'
import { ChevronRightIcon } from '@fex-design/angular/icons/chevron-right'
import { ChevronsLeftIcon } from '@fex-design/angular/icons/chevrons-left'
import { ChevronsRightIcon } from '@fex-design/angular/icons/chevrons-right'
import { buttonPrimitiveClassName } from '@fex-design/angular/primitive/button'
import { CalendarRoot } from '@fex-design/angular/primitive/calendar'
@Component({
  selector: 'button[datePickerHeaderButton]',
  standalone: true,
  imports: [ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'date-picker-header-button',
    type: 'button',
    '[class]': 'hostClassName()',
    '[attr.aria-label]':
      'getDatePickerHeaderActionLabel(action(), calendar.controller.getOptions().locale)',
    '[attr.data-action]': 'action()',
  },
  templateUrl: './date-picker-header-button.html',
})
export class DatePickerHeaderButton {
  protected readonly getDatePickerHeaderActionLabel = getDatePickerHeaderActionLabel
  constructor() {
    listenNativeEvent('click', (event) => this.runAction(event))
  }
  readonly action = input.required<DatePickerHeaderAction>()
  protected readonly calendar = inject(CalendarRoot)
  protected readonly hostClassName = createHostClassName(
    buttonPrimitiveClassName(datePickerHeaderNavigationClassName),
  )
  isPrevious() {
    return this.action().startsWith('previous')
  }
  isDouble() {
    return this.action().includes('year') || this.action().includes('panel')
  }
  runAction(event: Event) {
    if (!isPickerActionBlocked(event)) this.calendar.controller.navigate(this.action())
  }
}
