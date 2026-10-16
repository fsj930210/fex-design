import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePicker } from '@fex-design/angular/ui/time-picker'
@Component({ selector: 'time-picker-disabled-example', standalone: true, imports: [TimePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './disabled.html' })
export class TimePickerDisabledExample {
}
