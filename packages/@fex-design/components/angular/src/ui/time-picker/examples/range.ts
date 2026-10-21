import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { format } from '@fex-design/core/date/utils'
import type { TimeRangeValue } from '@fex-design/angular/primitive/time-picker'
import { TimeRangePicker } from '@fex-design/angular/ui/time-picker'
@Component({
  selector: 'time-picker-range-example',
  standalone: true,
  imports: [TimeRangePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './range.html',
})
export class TimePickerRangeExample {
  readonly initial: TimeRangeValue = [
    { hour: 9, minute: 30, second: 0 },
    { hour: 17, minute: 30, second: 0 },
  ]
  readonly confirmed = signal<TimeRangeValue | null>(this.initial)
  readonly immediate = signal<TimeRangeValue | null>(this.initial)
  display(value: TimeRangeValue | null) {
    return value ? `${format(value[0], 'HH:mm:ss')} → ${format(value[1], 'HH:mm:ss')}` : '未选择'
  }
}
