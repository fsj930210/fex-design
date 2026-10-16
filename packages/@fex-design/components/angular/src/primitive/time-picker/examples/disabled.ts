import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePickerRoot, TimePickerTrigger, TimePickerPortal, TimePickerContent, TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn } from '@fex-design/angular/primitive/time-picker'
@Component({ selector: 'time-picker-disabled-example', standalone: true, imports: [TimePickerRoot, TimePickerTrigger, TimePickerPortal, TimePickerContent, TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './disabled.html' })
export class TimePickerDisabledExample {
}
