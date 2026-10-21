import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker, RangePicker } from '@fex-design/angular/ui/date-picker'
@Component({
  selector: 'date-picker-locale-example',
  standalone: true,
  imports: [DatePicker, RangePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './locale.html',
})
export class DatePickerLocaleExample {
  readonly english = {
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    year: 'Year',
    yearSuffix: '',
    month: 'Month',
    datePanel: 'Date',
    monthPanel: 'Month',
    previous: 'Previous',
    next: 'Next',
    today: 'Today',
    week: 'Week',
  }
}
