import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter, DatePickerConfirm, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup } from '@fex-design/angular/primitive/date-picker'
@Component({ selector: 'date-picker-footer-example', standalone: true, imports: [DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter, DatePickerConfirm, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './footer.html' })
export class DatePickerFooterExample {
  
  
}
