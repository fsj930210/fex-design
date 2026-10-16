import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb } from '../scrollbar'
import { TimePickerColumnBase, columnHost } from './time-picker-column-base'
import { createHourOptions, createMinuteOptions, createSecondOptions, createPeriodOptions, getDisplayedHour, getDisplayedPeriod, resolveDisabledTime } from '@fex-design/core/time-picker/options'
import type { TimePeriod } from '@fex-design/core/time-picker/types'

@Component({ selector: 'div[timePickerPeriodColumn]', standalone: true, imports: [NgTemplateOutlet, ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb], changeDetection: ChangeDetectionStrategy.OnPush, host: { ...columnHost, '[style.display]': "root.use12Hours() ? null : 'none'" }, templateUrl: './time-picker-column.html' })
export class TimePickerPeriodColumn extends TimePickerColumnBase<TimePeriod> {
  readonly labels = input({ am: 'AM', pm: 'PM' })
  readonly isItemDisabled = input<(value: TimePeriod) => boolean>()
  readonly options = computed(() => (this.root.use12Hours() ? createPeriodOptions(this.labels()) : []).map(item => ({ ...item, disabled: item.disabled || Boolean(this.isItemDisabled()?.(item.value)) })))
  readonly selectedValue = computed(() => this.root.currentValue() ? getDisplayedPeriod(this.root.currentValue()!) : undefined)
  commit(value: TimePeriod) { this.root.controller.selectPeriod(value) }
}
