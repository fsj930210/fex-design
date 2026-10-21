import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { timePickerRootClassName } from '@fex-design/components-styles/time-picker'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
@Component({
  selector: 'div[timePickerPanel]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'time-picker-panel', '[class]': 'hostClassName()' },
  template: '<ng-content />',
})
export class TimePickerPanel {
  readonly class = input<string>()
  protected readonly hostClassName = createHostClassName(timePickerRootClassName, () =>
    this.class(),
  )
}
