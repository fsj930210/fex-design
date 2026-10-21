import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePicker } from '@fex-design/angular/ui/time-picker'
@Component({
  selector: 'time-picker-affixes-example',
  standalone: true,
  imports: [TimePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './affixes.html',
})
export class TimePickerAffixesExample {}
