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
import { NgTemplateOutlet } from '@angular/common'
import { Injector, TemplateRef } from '@angular/core'

@Component({
  selector: 'div[inputNumberRoot]',
  standalone: true,
  imports: [NgTemplateOutlet],
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
  template:
    '<ng-content /><ng-container [ngTemplateOutlet]="content() ?? null" [ngTemplateOutletInjector]="contentInjector" />',
})
export class InputNumberRoot implements OnInit {
  private formChange: (value: number | undefined) => void = () => {}
  private formTouched: () => void = () => {}
  writeValue(value: number | undefined) {
    this.hasValue.set(true)
    this.controlledValue.set(value)
  }
  registerOnChange(fn: (value: number | undefined) => void) {
    this.formChange = fn
  }
  registerOnTouched(fn: () => void) {
    this.formTouched = fn
  }
  readonly content = input<TemplateRef<unknown>>()
  protected readonly contentInjector = inject(Injector)
  readonly class = input<string>()
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
  readonly keyboard = input(true, {
    transform: (value: unknown) => (value == null ? true : booleanAttribute(value)),
  })
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly readOnly = input(false, { transform: booleanAttribute })
  readonly size = input<InputSize>('md')
  readonly variant = input<InputVariant>('outlined')
  readonly change = output<number | undefined>()

  private control?: HTMLInputElement
  protected readonly hostClassName = createHostClassName(
    () =>
      cn(
        inputRootClassName({ size: this.size(), variant: this.variant() }),
        inputNumberRootClassName,
      ),
    () => this.class(),
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
      onChange: (value) => {
        this.formChange(value)
        this.change.emit(value)
      },
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
