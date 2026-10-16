import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePickerFooter, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup } from '@fex-design/angular/primitive/date-picker'
@Component({ selector: 'date-picker-confirm-example', standalone: true, imports: [DatePickerFooter, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './confirm.html' })
export class DatePickerConfirmExample {
  
  
}
