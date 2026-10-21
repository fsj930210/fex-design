import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core'
import { getDatePickerTimeColumns } from '@fex-design/core/date-picker/time'
import { datePickerTimePanelClassName } from '@fex-design/components-styles/date-picker'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import {
  TimePickerRoot,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
} from '@fex-design/angular/primitive/time-picker'
import { DatePickerState } from './use-date-picker'
import { RangePickerState } from './use-range-picker'
@Component({
  selector: 'div[datePickerTimePanel]',
  standalone: true,
  imports: [
    TimePickerRoot,
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
    TimePickerPeriodColumn,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'date-picker-time-panel' },
  templateUrl: './date-picker-time-panel.html',
})
export class DatePickerTimePanel {
  readonly range = input(false, { transform: booleanAttribute })
  private readonly single = inject(DatePickerState, { optional: true })
  private readonly interval = inject(RangePickerState, { optional: true })
  readonly context = computed(() => (this.range() ? this.interval : this.single)?.context())
  readonly columns = computed(() => {
    const owner = this.context()
    return owner ? getDatePickerTimeColumns(owner.timeOptions) : []
  })
  protected readonly hostClassName = createHostClassName(datePickerTimePanelClassName)
}
