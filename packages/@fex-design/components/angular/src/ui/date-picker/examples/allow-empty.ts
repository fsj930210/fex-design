import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RangePicker } from '@fex-design/angular/ui/date-picker'
@Component({
  selector: 'date-picker-allow-empty-example',
  standalone: true,
  imports: [RangePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './allow-empty.html',
})
export class DatePickerAllowEmptyExample {}
