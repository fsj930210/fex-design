import type { CheckboxValue } from '@fex-design/core/checkbox/types'
import { booleanAttribute, Component, input, output } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import {
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
  CheckboxGroup as PrimitiveCheckboxGroup,
} from '@fex-design/angular/primitive/checkbox'
import { FormControlBase } from '../../forms/form-control-base'

@Component({
  selector: 'div[checkbox],button[checkbox],label[checkbox]',
  standalone: true,
  host: { style: 'display: contents' },
  imports: [CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxLabel],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: Checkbox, multi: true }],
  templateUrl: './checkbox.html',
})
export class Checkbox extends FormControlBase<boolean | 'indeterminate'> {
  readonly value = input<CheckboxValue>()
  readonly checked = input<boolean | 'indeterminate'>()
  readonly indeterminate = input<boolean>(false, { transform: booleanAttribute })
  readonly defaultChecked = input<boolean>(false, { transform: booleanAttribute })
  readonly disabled = input<boolean>(false, { transform: booleanAttribute })
  readonly ariaInvalid = input<boolean | 'true' | 'false' | undefined>(undefined, {
    alias: 'aria-invalid',
  })
  readonly name = input<string>()
  readonly indicator = input<unknown>()
  readonly classNames = input<unknown>()
  readonly styles = input<unknown>()
  readonly onChange = output<Event>()
  handleChange(event: Event) {
    const checked = (event.target as HTMLInputElement).indeterminate
      ? 'indeterminate'
      : (event.target as HTMLInputElement).checked
    this.emitFormValue(checked)
    this.onChange.emit(event)
    this.markFormTouched()
  }
}

@Component({
  selector: 'div[checkboxGroup]',
  standalone: true,
  imports: [Checkbox],
  hostDirectives: [
    {
      directive: PrimitiveCheckboxGroup,
      inputs: ['value', 'defaultValue', 'disabled', 'orientation'],
      outputs: ['change:onChange'],
    },
  ],
  templateUrl: './checkbox-group.html',
})
export class CheckboxGroup {
  readonly value = input<CheckboxValue[]>([])
  readonly options = input<readonly { label: string; value: CheckboxValue; disabled?: boolean }[]>()
}
