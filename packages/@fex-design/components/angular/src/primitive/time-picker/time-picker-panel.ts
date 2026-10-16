import { ChangeDetectionStrategy, Component } from '@angular/core'
import { timePickerRootClassName } from '@fex-design/components-styles/time-picker'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
@Component({ selector: 'div[timePickerPanel]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { 'data-slot': 'time-picker-panel', '[class]': 'hostClassName()' }, template: '<ng-content />' })
export class TimePickerPanel { protected readonly hostClassName = createHostClassName(timePickerRootClassName) }
