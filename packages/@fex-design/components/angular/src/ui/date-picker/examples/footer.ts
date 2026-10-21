import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker, RangePicker } from '@fex-design/angular/ui/date-picker'
import { DatePickerConfirm } from '@fex-design/angular/primitive/date-picker'
@Component({
  selector: 'date-picker-footer-example',
  standalone: true,
  imports: [DatePicker, RangePicker, DatePickerConfirm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
})
export class DatePickerFooterExample {}
