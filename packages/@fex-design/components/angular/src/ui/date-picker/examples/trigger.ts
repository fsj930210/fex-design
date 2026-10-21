import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker } from '@fex-design/angular/ui/date-picker'
@Component({
  selector: 'date-picker-trigger-example',
  standalone: true,
  imports: [DatePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trigger.html',
})
export class DatePickerTriggerExample {}
