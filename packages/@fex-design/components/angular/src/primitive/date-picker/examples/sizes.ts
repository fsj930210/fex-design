import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter } from '@fex-design/angular/primitive/date-picker'
@Component({ selector: 'date-picker-sizes-example', standalone: true, imports: [DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './sizes.html' })
export class DatePickerSizesExample {

}
