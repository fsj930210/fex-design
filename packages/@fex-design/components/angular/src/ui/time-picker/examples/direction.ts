import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePicker } from '@fex-design/angular/ui/time-picker'
@Component({ selector: 'time-picker-direction-example', standalone: true, imports: [TimePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './direction.html' })
export class TimePickerDirectionExample {
}
