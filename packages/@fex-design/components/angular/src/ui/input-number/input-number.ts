import type {
  InputNumberPart,
} from '@fex-design/core/input-number/types'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
} from '@angular/core'
import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/angular/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/angular/primitive/input'
import { inputRootClassName } from '@fex-design/components-styles/input'
import { inputNumberRootClassName } from '@fex-design/components-styles/input-number'
import { cn } from '@fex-design/utils'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
@Component({
  selector: 'div[inputNumber]',
  standalone: true,
  imports: [
    InputNumberControl,
    InputNumberClear,
    InputNumberActions,
    InputNumberIncrement,
    InputNumberDecrement,
    InputPrefix,
    InputSuffix,
  ],
  providers: [{ provide: InputNumberRoot, useExisting: forwardRef(() => InputNumber) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.id]': 'null', '[style]': 'styles()?.root' },
  templateUrl: './input-number.html',
})
export class InputNumber extends InputNumberRoot {
  readonly clearable = input(false, { transform: booleanAttribute })
  readonly controls = input(true, { transform: booleanAttribute })
  readonly id = input<string>()
  readonly name = input<string>()
  readonly placeholder = input<string>()
  readonly required = input(false, { transform: booleanAttribute })
  readonly invalid = input(false, { transform: booleanAttribute })
  readonly describedBy = input<string>()
  readonly classNames = input<Partial<Record<InputNumberPart, string>>>()
  readonly styles = input<Partial<Record<InputNumberPart, string>>>()
  protected override readonly hostClassName = createHostClassName(() => cn(
    inputRootClassName({ size: this.size(), variant: this.variant() }),
    inputNumberRootClassName,
    this.classNames()?.root,
  ))
  protected readonly prefixClassName = computed(() => cn('empty:hidden', this.classNames()?.prefix))
  protected readonly suffixClassName = computed(() => cn('empty:hidden', this.classNames()?.suffix))
}

export interface InputNumberChange {
  event: Event
  value: number | undefined
}
export { InputSuffix as InputNumberSuffix } from '@fex-design/angular/primitive/input'
