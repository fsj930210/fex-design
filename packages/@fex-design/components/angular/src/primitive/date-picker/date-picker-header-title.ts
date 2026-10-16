import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { datePickerHeaderTitleClassName } from '@fex-design/components-styles/date-picker'
@Component({ selector: 'div[datePickerHeaderTitle]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { 'data-slot': 'date-picker-header-title', '[class]': 'hostClassName()' }, template: '<ng-content />' })
export class DatePickerHeaderTitle { protected readonly hostClassName = createHostClassName(datePickerHeaderTitleClassName) }
