import { calendarDefaultLocale } from '@fex-design/core/calendar'
import { getPickerAppearance } from './appearance-context'
import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'
import { listenNativeEvent } from '@fex-design/angular/directives/listen-native-event'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core'
import { cn } from '@fex-design/utils'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { datePickerTodayClassName } from '@fex-design/components-styles/date-picker'
import { buttonPrimitiveClassName } from '@fex-design/angular/primitive/button'
import { getFooterOwner } from './date-picker-footer-owner'
@Component({
  selector: 'button[datePickerToday]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'date-picker-today',
    type: 'button',
    '[class]': 'hostClassName()',
    '[disabled]': 'disabled()',
  },
  templateUrl: './date-picker-today.html',
})
export class DatePickerToday {
  protected readonly appearance = getPickerAppearance()
  protected readonly label = computed(
    () => this.appearance().calendarProps?.locale?.today ?? calendarDefaultLocale.today,
  )
  readonly class = input<string>()
  constructor() {
    listenNativeEvent('click', (event) => this.click(event))
  }
  readonly disabled = input(false, { transform: booleanAttribute })
  protected readonly hostClassName = createHostClassName(
    cn(buttonPrimitiveClassName(), datePickerTodayClassName),
    () => this.class(),
  )
  protected readonly owner = getFooterOwner()
  click(event: Event) {
    if (isPickerActionBlocked(event)) return
    this.owner.today()
  }
}
