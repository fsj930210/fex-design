import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePicker } from '@fex-design/angular/ui/time-picker'
@Component({ selector: 'time-picker-basic-example', standalone: true, imports: [TimePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class TimePickerBasicExample {
}
