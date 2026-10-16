import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import type { TimePickerOption } from '@fex-design/core/time-picker/types'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb } from '../scrollbar'
import { TimePickerColumnBase, columnHost, type ColumnValue } from './time-picker-column-base'
@Component({ selector: 'div[timePickerColumn]', standalone: true, imports: [NgTemplateOutlet, ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb], changeDetection: ChangeDetectionStrategy.OnPush, host: columnHost, templateUrl: './time-picker-column.html' })
export class TimePickerColumn extends TimePickerColumnBase<ColumnValue> {
  readonly options = input.required<readonly TimePickerOption<ColumnValue>[]>()
  readonly selectedValue = input<ColumnValue>()
  readonly selectChange = output<ColumnValue>()
  commit(value: ColumnValue) { this.selectChange.emit(value) }
}
