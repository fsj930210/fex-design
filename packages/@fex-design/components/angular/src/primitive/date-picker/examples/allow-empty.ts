import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter } from '@fex-design/angular/primitive/date-picker'
@Component({ selector: 'date-picker-allow-empty-example', standalone: true, imports: [RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './allow-empty.html' })
export class DatePickerAllowEmptyExample {

}
