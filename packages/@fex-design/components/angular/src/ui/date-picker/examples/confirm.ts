import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RangePicker } from '@fex-design/angular/ui/date-picker'
@Component({ selector: 'date-picker-confirm-example', standalone: true, imports: [RangePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './confirm.html' })
export class DatePickerConfirmExample {
  
  
}
