import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker } from '@fex-design/angular/ui/date-picker'
@Component({ selector: 'date-picker-basic-example', standalone: true, imports: [DatePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class DatePickerBasicExample {
  
  
}
