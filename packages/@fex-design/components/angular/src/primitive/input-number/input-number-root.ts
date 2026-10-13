import type { InputNumberFormatter, InputNumberParser } from '@fex-design/core/input-number/types'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import { inputRootClassName } from '@fex-design/components-styles/input'
import { inputNumberRootClassName } from '@fex-design/components-styles/input-number'
import { cn } from '@fex-design/utils'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  Input,
  output,
  signal,
  type OnInit,
} from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { useInputNumber } from './use-input-number'

@Component({
  selector: 'div[inputNumberRoot]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'input-number-root',
    '[attr.data-disabled]': "disabled() ? 'true' : null",
    '[attr.data-readonly]': "readOnly() ? 'true' : null",
    '[attr.data-size]': 'size()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-out-of-range]': "inputNumber.outOfRange() ? 'true' : null",
  },
  template: '<ng-content />',
})
export class InputNumberRoot implements OnInit {
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  private readonly controlledValue = signal<number | undefined>(undefined)
  private readonly hasValue = signal(false)

  @Input() set value(value: number | undefined) {
    this.hasValue.set(true)
    this.controlledValue.set(value)
  }

  readonly controlled = input<boolean>()
  readonly defaultValue = input<number>()
  readonly min = input<number>()
  readonly max = input<number>()
  readonly step = input(1)
  readonly precision = input<number>()
  readonly parser = input<InputNumberParser>()
  readonly formatter = input<InputNumberFormatter>()
  readonly keyboard = input(true, { transform: (value: unknown) => value == null ? true : booleanAttribute(value) })
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly readOnly = input(false, { transform: booleanAttribute })
  readonly size = input<InputSize>('md')
  readonly variant = input<InputVariant>('outlined')
  readonly change = output<{ event: Event; value: number | undefined }>()

  private control?: HTMLInputElement
  protected readonly hostClassName = createHostClassName(() =>
    cn(inputRootClassName({ size: this.size(), variant: this.variant() }), inputNumberRootClassName),
  )

  readonly inputNumber = useInputNumber(
    computed(() => ({
      controlled: this.controlled() ?? this.hasValue(),
      value: this.controlledValue(),
      defaultValue: this.defaultValue(),
      min: this.min(),
      max: this.max(),
      step: this.step(),
      precision: this.precision(),
      parser: this.parser(),
      formatter: this.formatter(),
      disabled: this.disabled(),
      readOnly: this.readOnly(),
      keyboard: this.keyboard(),
      onChange: (event, value) => this.change.emit({ event, value }),
    })),
  )

  ngOnInit() {
    this.inputNumber.initialize(this.defaultValue())
  }

  setControl(element: HTMLInputElement) {
    this.control = element
  }

  focusControl() {
    this.control?.focus()
  }
}
