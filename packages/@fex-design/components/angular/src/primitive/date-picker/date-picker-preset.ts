import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core'
import { cn } from '@fex-design/utils'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { datePickerPresetClassName } from '@fex-design/components-styles/date-picker'
import { buttonPrimitiveClassName } from '@fex-design/angular/primitive/button'
@Component({ selector: 'button[datePickerPreset]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { 'data-slot': 'date-picker-preset', type: 'button', '[class]': 'hostClassName()', '[disabled]': 'disabled()' }, template: '<ng-content></ng-content>' })
export class DatePickerPreset {
  readonly disabled = input(false, { transform: booleanAttribute })
  protected readonly hostClassName = createHostClassName(cn(buttonPrimitiveClassName(), datePickerPresetClassName))
}
