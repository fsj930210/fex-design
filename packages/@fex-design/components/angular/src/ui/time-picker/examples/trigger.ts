import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePicker } from '@fex-design/angular/ui/time-picker'
@Component({ selector: 'time-picker-trigger-example', standalone: true, imports: [TimePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './trigger.html' })
export class TimePickerTriggerExample {
}
