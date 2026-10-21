import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePickerTrigger } from '@fex-design/angular/primitive/time-picker'
import { TimePicker } from '@fex-design/angular/ui/time-picker'
@Component({
  selector: 'time-picker-trigger-example',
  standalone: true,
  imports: [TimePicker, TimePickerTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trigger.html',
})
export class TimePickerTriggerExample {}
