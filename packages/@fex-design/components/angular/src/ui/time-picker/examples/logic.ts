import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { TimePickerState } from '@fex-design/angular/primitive/time-picker'
@Component({ selector: 'time-picker-logic-example', standalone: true, imports: [], providers: [TimePickerState], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './logic.html' })
export class TimePickerLogicExample {
  readonly state = inject(TimePickerState)
  constructor() { this.state.setOptions({ defaultValue: { hour: 9, minute: 30, second: 0 } }) }
}
