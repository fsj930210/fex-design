import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/angular/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/angular/primitive/input'
import type { InputNumberPart } from '@fex-design/core/input-number/types'
import { FormControlBase } from '../../forms/form-control-base'

@Component({
  selector: 'div[inputNumber]',
  standalone: true,
  imports: [
    InputNumberRoot,
    InputNumberControl,
    InputNumberActions,
    InputNumberIncrement,
    InputNumberDecrement,
  ],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: InputNumber, multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-number.html',
})
export class InputNumber extends FormControlBase<number | undefined> {
  readonly value = input<number>()
  readonly defaultValue = input<number>()
  readonly min = input<number>()
  readonly max = input<number>()
  readonly step = input(1)
  readonly disabled = input(false)
  readonly readOnly = input(false)
  readonly precision = input<number>()
  readonly controls = input<boolean | object>()
  readonly formatter = input<unknown>()
  readonly parser = input<unknown>()
  readonly onChange = output<number | undefined>()
  protected handleChange(value: number | undefined) {
    this.emitFormValue(value)
    this.onChange.emit(value)
  }
  readonly classNames = input<Partial<Record<InputNumberPart, string>>>({})
  protected readonly resolvedValue = this.resolveFormValue(
    () => this.value(),
    () => this.defaultValue(),
  )
}
