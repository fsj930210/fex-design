import { Button } from '@fex-design/angular/primitive/button'
import type { TimeValue } from '@fex-design/angular/primitive/time-picker'
import { format } from '@fex-design/core/date/utils'
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
@Component({
  selector: 'time-picker-confirm-example',
  standalone: true,
  imports: [
    Button,
    TimePickerRoot,
    TimePickerTrigger,
    TimePickerPortal,
    TimePickerContent,
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirm.html',
})
export class TimePickerConfirmExample {
  readonly committed = signal<TimeValue | null>({ hour: 9, minute: 30, second: 0 })
  readonly draft = signal<TimeValue | null>({ hour: 9, minute: 30, second: 0 })
  readonly open = signal(false)
  changeOpen(next: boolean) {
    this.open.set(next)
    if (!next) this.draft.set(this.committed())
  }
  confirm() {
    this.committed.set(this.draft())
    this.open.set(false)
  }
  formatValue(value: TimeValue | null) {
    return value ? format(value, 'HH:mm:ss') : '未选择'
  }
}
