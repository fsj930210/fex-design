import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  TimePickerRoot,
  TimePickerTrigger,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
} from '@fex-design/angular/primitive/time-picker'
import type { TimeValue } from '@fex-design/angular/primitive/time-picker'
import { Button } from '@fex-design/angular/ui/button'
import { format } from '@fex-design/core/date/utils'

@Component({
  selector: 'time-picker-controlled-example',
  standalone: true,
  imports: [
    TimePickerRoot,
    TimePickerTrigger,
    TimePickerPortal,
    TimePickerContent,
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
    Button,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controlled.html',
})
export class TimePickerControlledExample {
  readonly initialValue: TimeValue = { hour: 9, minute: 30, second: 0 }
  readonly afternoonValue: TimeValue = { hour: 14, minute: 45, second: 30 }
  readonly value = signal<TimeValue | null>(this.initialValue)
  readonly open = signal(false)
  readonly uncontrolledValue = signal<TimeValue | null>(this.initialValue)
  formatValue(value: TimeValue | null) {
    return value ? format(value, 'HH:mm:ss') : '未选择'
  }
}
