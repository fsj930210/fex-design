import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { datePickerHeaderClassName } from '@fex-design/components-styles/date-picker'
@Component({ selector: 'div[datePickerHeader]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { 'data-slot': 'date-picker-header', '[class]': 'hostClassName()' }, template: '<ng-content />' })
export class DatePickerHeader {
  readonly class = input<string>()
  protected readonly hostClassName = createHostClassName(datePickerHeaderClassName, () => this.class())
}
