import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { TimePickerState } from '@fex-design/angular/primitive/time-picker'
@Component({ selector: 'time-picker-use-time-picker-example', standalone: true, imports: [], providers: [TimePickerState], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './logic.html' })
export class TimePickerUseTimePickerExample {
  readonly state = inject(TimePickerState)
  readonly hours = Array.from({ length: 24 }, (_, value) => value)
  readonly minutes = Array.from({ length: 60 }, (_, value) => value)
  readonly seconds = Array.from({ length: 60 }, (_, value) => value)
  constructor() { this.state.setOptions({ defaultValue: { hour: 9, minute: 30, second: 0 } }) }
}
