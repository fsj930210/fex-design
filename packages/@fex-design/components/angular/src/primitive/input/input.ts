import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import {
  inputAddonAfterClassName,
  inputAddonBeforeClassName,
  inputClearClassName,
  inputControlClassName,
  inputGroupClassName,
  inputPrefixClassName,
  inputRootClassName,
  inputSuffixClassName,
} from '@fex-design/components-styles/input'
import { cn } from '@fex-design/utils'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
  type OnInit,
} from '@angular/core'
import { CircleXIcon } from '@fex-design/angular/icons/circle-x'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[inputRoot]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[attr.data-disabled]': "disabled() ? 'true' : null",
    '[attr.data-readonly]': "readOnly() ? 'true' : null",
    '[attr.data-size]': 'size()',
    '[attr.data-variant]': 'variant()',
    'data-slot': 'input-root',
  },
  template: '<ng-content />',
})
export class InputRoot implements OnInit {
  readonly value = input<string>()
  readonly defaultValue = input('')
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly readOnly = input(false, { transform: booleanAttribute })
  readonly size = input<InputSize>('md')
  readonly variant = input<InputVariant>('outlined')
  readonly valueChange = output<string>()
  readonly cleared = output<void>({ alias: 'clear' })
  private readonly uncontrolledValue = signal(this.defaultValue())
  private focusElement?: HTMLInputElement
  readonly currentValue = () => this.value() ?? this.uncontrolledValue()
  readonly canClear = () => this.currentValue() !== '' && !this.disabled() && !this.readOnly()
  protected readonly hostClassName = createHostClassName(() =>
    inputRootClassName({ size: this.size(), variant: this.variant() }),
  )
  ngOnInit() {
    if (this.value() === undefined) this.uncontrolledValue.set(this.defaultValue())
  }
  setFocusElement(element: HTMLInputElement) {
    this.focusElement = element
  }
  setValue(value: string) {
    if (this.disabled() || this.readOnly()) return
    if (this.value() === undefined) this.uncontrolledValue.set(value)
    this.valueChange.emit(value)
  }
  clearValue() {
    if (!this.canClear()) return
    this.setValue('')
    this.cleared.emit()
    this.focusElement?.focus()
  }
}

@Component({
  selector: 'div[inputGroup]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', role: 'group', 'data-slot': 'input-group' },
  template: '<ng-content />',
})
export class InputGroup {
  protected readonly hostClassName = createHostClassName(inputGroupClassName)
}

@Directive({
  selector: 'input[inputControl]',
  standalone: true,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'input-control',
    '[value]': 'root.currentValue()',
    '[disabled]': 'root.disabled()',
    '[readOnly]': 'root.readOnly()',
  },
})
export class InputControl {
  readonly root = inject(InputRoot)
  readonly element = inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement
  protected readonly hostClassName = createHostClassName(inputControlClassName)
  constructor() {
    this.root.setFocusElement(this.element)
  }
  @HostListener('input', ['$event']) onInput(event: Event) {
    this.root.setValue((event.currentTarget as HTMLInputElement).value)
  }
  focus(options?: FocusOptions) {
    this.element.focus(options)
  }
  blur() {
    this.element.blur()
  }
  select() {
    this.element.select()
  }
}

@Directive({
  selector: '[inputPrefix]',
  standalone: true,
  host: { '[class]': 'hostClassName()', 'data-slot': 'input-prefix' },
})
export class InputPrefix {
  protected readonly hostClassName = createHostClassName(inputPrefixClassName)
}

@Directive({
  selector: '[inputSuffix]',
  standalone: true,
  host: { '[class]': 'hostClassName()', 'data-slot': 'input-suffix' },
})
export class InputSuffix {
  protected readonly hostClassName = createHostClassName(inputSuffixClassName)
}

@Directive({
  selector: '[inputAddonBefore]',
  standalone: true,
  host: { '[class]': 'hostClassName()', 'data-slot': 'input-addon-before' },
})
export class InputAddonBefore {
  protected readonly hostClassName = createHostClassName(inputAddonBeforeClassName)
}

@Directive({
  selector: '[inputAddonAfter]',
  standalone: true,
  host: { '[class]': 'hostClassName()', 'data-slot': 'input-addon-after' },
})
export class InputAddonAfter {
  protected readonly hostClassName = createHostClassName(inputAddonAfterClassName)
}

@Component({
  selector: 'button[inputClear]',
  standalone: true,
  imports: [CircleXIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'input-clear',
    type: 'button',
    '[hidden]': '!forceMount() && !root.canClear()',
    '[disabled]': '!forceMount() && !root.canClear()',
    '(click)': 'root.clearValue()',
  },
  templateUrl: './input-clear.html',
})
export class InputClear {
  readonly forceMount = input(false, { transform: booleanAttribute })
  readonly root = inject(InputRoot)
  protected readonly hostClassName = createHostClassName(() => cn(inputClearClassName))
}
