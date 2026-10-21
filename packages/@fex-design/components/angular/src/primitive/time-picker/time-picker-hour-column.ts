import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
} from '../scrollbar'
import { TimePickerColumnBase, columnHost } from './time-picker-column-base'
import {
  createHourOptions,
  createMinuteOptions,
  createSecondOptions,
  createPeriodOptions,
  getDisplayedHour,
  getDisplayedPeriod,
  resolveDisabledTime,
} from '@fex-design/core/time-picker/options'
import type { TimePeriod } from '@fex-design/core/time-picker/types'

@Component({
  selector: 'div[timePickerHourColumn]',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    ScrollbarRoot,
    ScrollbarViewport,
    ScrollbarBar,
    ScrollbarTrack,
    ScrollbarThumb,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ...columnHost },
  templateUrl: './time-picker-column.html',
})
export class TimePickerHourColumn extends TimePickerColumnBase<number> {
  readonly step = input(1, { transform: numberAttribute })
  readonly isItemDisabled = input<(value: number) => boolean>()
  readonly options = computed(() =>
    createHourOptions({
      step: this.step(),
      use12Hours: this.root.use12Hours(),
      period: this.root.currentValue() ? getDisplayedPeriod(this.root.currentValue()!) : 'am',
      disabled: resolveDisabledTime(this.root.disabledTime(), this.root.currentValue()).hours,
    }).map((item) => ({
      ...item,
      disabled: item.disabled || Boolean(this.isItemDisabled()?.(item.value)),
    })),
  )
  readonly selectedValue = computed(() =>
    this.root.currentValue()
      ? getDisplayedHour(this.root.currentValue()!, this.root.use12Hours())
      : undefined,
  )
  commit(value: number) {
    this.root.controller.selectHour(value, this.root.use12Hours())
  }
}
