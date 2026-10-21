import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePicker } from '@fex-design/angular/ui/time-picker'
import {
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
} from '@fex-design/angular/primitive/time-picker'
@Component({
  selector: 'time-picker-item-example',
  standalone: true,
  imports: [
    TimePicker,
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item.html',
})
export class TimePickerItemExample {}
