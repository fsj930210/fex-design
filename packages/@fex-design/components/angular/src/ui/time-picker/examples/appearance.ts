import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePicker } from '@fex-design/angular/ui/time-picker'
@Component({
  selector: 'time-picker-appearance-example',
  standalone: true,
  imports: [TimePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './appearance.html',
})
export class TimePickerAppearanceExample {}
