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
  selector: 'div[timePickerSecondColumn]',
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
export class TimePickerSecondColumn extends TimePickerColumnBase<number> {
  readonly step = input(1, { transform: numberAttribute })
  readonly isItemDisabled = input<(value: number) => boolean>()
  readonly options = computed(() =>
    createSecondOptions(
      this.step(),
      resolveDisabledTime(this.root.disabledTime(), this.root.currentValue()).seconds,
    ).map((item) => ({
      ...item,
      disabled: item.disabled || Boolean(this.isItemDisabled()?.(item.value)),
    })),
  )
  readonly selectedValue = computed(() => this.root.currentValue()?.second)
  commit(value: number) {
    this.root.controller.selectSecond(value)
  }
}
