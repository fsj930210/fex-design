import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker, RangePicker } from '@fex-design/angular/ui/date-picker'
@Component({ selector: 'date-picker-sizes-example', standalone: true, imports: [DatePicker, RangePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './sizes.html' })
export class DatePickerSizesExample {

}
