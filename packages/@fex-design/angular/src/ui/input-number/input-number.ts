import type {
  InputNumberFormatter,
  InputNumberParser,
  InputNumberPart,
} from '@fex-design/core/input-number/types'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  output,
  signal,
} from '@angular/core'
import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '../../primitive/input-number/input-number'
import { InputPrefix, InputSuffix } from '../../primitive/input/input'
@Component({
  selector: 'div[inputNumber]',
  standalone: true,
  imports: [
    InputNumberRoot,
    InputNumberControl,
    InputNumberClear,
    InputNumberActions,
    InputNumberIncrement,
    InputNumberDecrement,
    InputPrefix,
    InputSuffix,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents', '[attr.id]': 'null' },
  templateUrl: './input-number.html',
})
export class InputNumber {
  protected readonly valueState = signal<number | undefined>(undefined)
  protected readonly hasValue = signal(false)
  @Input() set value(value: number | undefined) {
    this.hasValue.set(true)
    this.valueState.set(value)
  }
  readonly defaultValue = input<number>()
  readonly min = input<number>()
  readonly max = input<number>()
  readonly step = input(1)
  readonly precision = input<number>()
  readonly parser = input<InputNumberParser>()
  readonly formatter = input<InputNumberFormatter>()
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly readOnly = input(false, { transform: booleanAttribute })
  readonly keyboard = input(true, { transform: booleanAttribute })
  readonly clearable = input(false, { transform: booleanAttribute })
  readonly controls = input(true, { transform: booleanAttribute })
  readonly size = input<'sm' | 'md' | 'lg'>('md')
  readonly variant = input<'outlined' | 'filled' | 'borderless' | 'underlined'>('outlined')
  readonly id = input<string>()
  readonly name = input<string>()
  readonly placeholder = input<string>()
  readonly required = input(false, { transform: booleanAttribute })
  readonly invalid = input(false, { transform: booleanAttribute })
  readonly describedBy = input<string>()
  readonly classNames = input<Partial<Record<InputNumberPart, string>>>()
  readonly styles = input<Partial<Record<InputNumberPart, string>>>()
  readonly change = output<{ event: Event; value: number | undefined }>()
}

export interface InputNumberChange {
  event: Event
  value: number | undefined
}
export { InputSuffix as InputNumberSuffix } from '../../primitive/input/input'
