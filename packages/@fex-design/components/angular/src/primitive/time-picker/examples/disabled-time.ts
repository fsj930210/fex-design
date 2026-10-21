import { ChangeDetectionStrategy, Component } from '@angular/core'
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
  selector: 'time-picker-disabled-time-example',
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './disabled-time.html',
})
export class TimePickerDisabledTimeExample {
  readonly disabledTime = () => ({
    disabledHours: () => [0, 1, 2],
    disabledMinutes: (hour: number) => (hour === 9 ? [15, 45] : []),
  })
}
