import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter } from '@fex-design/angular/primitive/date-picker'
@Component({ selector: 'date-picker-locale-example', standalone: true, imports: [DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './locale.html' })
export class DatePickerLocaleExample {
readonly english = { weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], year: 'Year', yearSuffix: '', month: 'Month', datePanel: 'Date', monthPanel: 'Month', previous: 'Previous', next: 'Next', today: 'Today', week: 'Week' }
}
