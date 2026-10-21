import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePicker } from '@fex-design/angular/ui/time-picker'
@Component({
  selector: 'time-picker-disabled-time-example',
  standalone: true,
  imports: [TimePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './disabled-time.html',
})
export class TimePickerDisabledTimeExample {
  readonly disabledTime = () => ({
    disabledHours: () => [0, 1, 2],
    disabledMinutes: (hour: number) => (hour === 9 ? [15, 45] : []),
  })
}
