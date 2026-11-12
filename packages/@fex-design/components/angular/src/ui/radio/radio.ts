import { radioItemClassName, radioLabelClassName } from '@fex-design/components-styles/radio'
import type { RadioValue, RadioChangeMeta } from '@fex-design/angular/primitive/radio'
import { booleanAttribute, Component, input, output, inject } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { FormControlBase } from '../../forms/form-control-base'
import {
  Radio as PrimitiveRadio,
  RadioButton,
  RadioGroup as PrimitiveRadioGroup,
} from '@fex-design/angular/primitive/radio'
export { RadioButton, type RadioValue, type RadioChangeMeta }

@Component({
  selector: 'div[radio]',
  standalone: true,
  host: { style: 'display: contents' },
  imports: [PrimitiveRadio],
  templateUrl: './radio.html',
})
export class Radio {
  protected readonly itemClassName = radioItemClassName
  protected readonly labelClassName = radioLabelClassName
  readonly value = input.required<RadioValue>()
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly classNames = input<unknown>()
}

@Component({
  selector: 'div[radioGroup]',
  standalone: true,
  imports: [Radio],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: RadioGroup, multi: true }],
  hostDirectives: [
    {
      directive: PrimitiveRadioGroup,
      inputs: ['value', 'defaultValue', 'disabled', 'orientation'],
    },
  ],
  templateUrl: './radio-group.html',
})
export class RadioGroup extends FormControlBase<RadioValue | undefined> {
  private readonly primitive = inject(PrimitiveRadioGroup)
  readonly onChange = output<{ value: RadioValue; meta: RadioChangeMeta }>()
  readonly value = input<RadioValue>()
  readonly options = input<readonly { label: string; value: RadioValue; disabled?: boolean }[]>()
  constructor() {
    super()
    this.primitive.onChange.subscribe((event) => {
      this.emitFormValue(event.value)
      this.markFormTouched()
      this.onChange.emit(event)
    })
  }
}

@Component({
  selector: 'div[radioButtonGroup]',
  standalone: true,
  imports: [RadioButton],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: RadioButtonGroup, multi: true }],
  hostDirectives: [
    {
      directive: PrimitiveRadioGroup,
      inputs: ['value', 'defaultValue', 'disabled', 'orientation'],
    },
  ],
  templateUrl: './radio-button-group.html',
})
export class RadioButtonGroup extends FormControlBase<RadioValue | undefined> {
  private readonly primitive = inject(PrimitiveRadioGroup)
  readonly onChange = output<{ value: RadioValue; meta: RadioChangeMeta }>()
  readonly value = input<RadioValue>()
  readonly options = input<readonly { label: string; value: RadioValue; disabled?: boolean }[]>()
  constructor() {
    super()
    this.primitive.onChange.subscribe((event) => {
      this.emitFormValue(event.value)
      this.markFormTouched()
      this.onChange.emit(event)
    })
  }
}
