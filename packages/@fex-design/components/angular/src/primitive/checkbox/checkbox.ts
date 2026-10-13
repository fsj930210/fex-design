import { createCheckboxGroupController } from '@fex-design/core/checkbox/create-checkbox-group-controller'
import type { CheckboxGroupChangeMeta, CheckboxGroupController, CheckboxGroupSnapshot, CheckboxValue } from '@fex-design/core/checkbox/types'
import {
  checkboxCheckIconClassName,
  checkboxControlClassName,
  checkboxGroupClassName,
  checkboxIndicatorClassName,
  checkboxLabelClassName,
  checkboxMinusIconClassName,
  checkboxRootClassName,
} from '@fex-design/components-styles/checkbox'
  import { CheckIcon } from '@fex-design/angular/icons/check'
  import { MinusIcon } from '@fex-design/angular/icons/minus'
import { cn } from '@fex-design/utils'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  type OnInit,
  type Signal,
} from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'
let checkboxId = 0
@Component({
  selector: 'div[checkboxRoot], button[checkboxRoot]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'checkbox-root',
    '[attr.data-size]': 'size()',
  },
  template: '<ng-content />',
})
export class CheckboxRoot {
  value = input<CheckboxValue | undefined>()
  checked = input<boolean | 'indeterminate' | undefined>()
  defaultChecked = input(false, { transform: booleanAttribute })
  disabled = input(false, { transform: booleanAttribute })
  size = input<'sm' | 'md' | 'lg'>('md')
  readonly controlId = `checkbox-${++checkboxId}`
  protected readonly hostClassName = createHostClassName(() =>
    checkboxRootClassName({ size: this.size() }),
  )
}
@Component({
  selector: 'div[checkboxGroup]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    role: 'group',
    'data-slot': 'checkbox-group',
    '[attr.data-orientation]': 'orientation()',
  },
  template: '<ng-content />',
})
export class CheckboxGroup implements OnInit {
  value = input<CheckboxValue[] | undefined>()
  defaultValue = input<CheckboxValue[] | undefined>()
  disabled = input(false, { transform: booleanAttribute })
  orientation = input<'horizontal' | 'vertical'>('vertical')
  change = output<{ value: CheckboxValue[]; meta: CheckboxGroupChangeMeta }>()
  private readonly destroyRef = inject(DestroyRef)
  private controller!: CheckboxGroupController
  private snapshot!: Signal<CheckboxGroupSnapshot>
  ngOnInit() {
    const owner = this
    this.controller = createCheckboxGroupController({
      get value() {
        return owner.value()
      },
      get defaultValue() {
        return owner.defaultValue()
      },
      get disabled() {
        return owner.disabled()
      },
      onChange: (value, meta) => owner.change.emit({ value, meta }),
    })
    this.snapshot = createCoreStoreSignal(this.controller, this.destroyRef)
  }
  protected readonly hostClassName = createHostClassName(() =>
    checkboxGroupClassName({ orientation: this.orientation() }),
  )
  currentValue() {
    return this.value() ?? this.snapshot().value
  }
  toggle(value: CheckboxValue) {
    this.controller.toggle(value)
  }
}
@Directive({
  selector: 'input[type=checkbox][checkboxControl]',
  standalone: true,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'checkbox-control',
    '[id]': 'resolvedId()',
    '[checked]': 'resolvedChecked()',
    '[disabled]': 'resolvedDisabled()',
    '[attr.name]': 'name()??null',
    '(change)': 'handleChange($event)',
  },
})
export class CheckboxControl implements OnInit {
  id = input<string | undefined>()
  value = input<CheckboxValue | undefined>()
  checked = input<boolean | 'indeterminate' | undefined>()
  defaultChecked = input(false, { transform: booleanAttribute })
  name = input<string | undefined>()
  disabled = input(false, { transform: booleanAttribute })
  indeterminate = input(false, { transform: booleanAttribute })
  private readonly element = inject<ElementRef<HTMLInputElement>>(ElementRef)
  readonly root = inject(CheckboxRoot, { optional: true })
  readonly group = inject(CheckboxGroup, { optional: true })
  private readonly internalChecked = signal(false)
  ngOnInit() { this.internalChecked.set(this.defaultChecked()) }
  protected readonly hostClassName = createHostClassName(() => checkboxControlClassName)
  protected readonly resolvedId = computed(() => this.id() ?? this.root?.controlId)
  private readonly resolvedValue = computed(() => this.value() ?? this.root?.value())
  protected readonly resolvedChecked = computed(() => {
    const value = this.resolvedValue()
    if (this.group && value !== undefined) return this.group.currentValue().includes(value)
    return (
      this.checked() ??
      this.internalChecked()
    )
  })
  protected readonly resolvedDisabled = computed(() =>
    Boolean(this.disabled() || this.root?.disabled() || this.group?.disabled()),
  )
  constructor() {
    effect(() => {
      this.element.nativeElement.indeterminate = this.indeterminate()
    })
  }
  handleChange(event: Event) {
    const input = event.target as HTMLInputElement
    const value = this.resolvedValue()
    if (!event.defaultPrevented && this.checked() === undefined && !this.group) {
      this.internalChecked.set(input.checked)
    }
    if (!event.defaultPrevented && this.group && value !== undefined) this.group.toggle(value)
  }
}
@Component({
  selector: 'span[checkboxIndicator]',
  standalone: true,
    imports: [CheckIcon, MinusIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'aria-hidden': 'true', 'data-slot': 'checkbox-indicator' },
  templateUrl: './checkbox-indicator.html',
})
export class CheckboxIndicator {
  protected readonly hostClassName = createHostClassName(() => checkboxIndicatorClassName)
  protected readonly checkIconClassName = checkboxCheckIconClassName
  protected readonly minusIconClassName = checkboxMinusIconClassName
}
@Directive({
  selector: 'label[checkboxLabel]',
  standalone: true,
  host: { '[class]': 'hostClassName()', '[attr.for]': 'htmlFor()', 'data-slot': 'checkbox-label' },
})
export class CheckboxLabel {
  readonly root = inject(CheckboxRoot)
  protected readonly htmlFor = computed(() => this.root.controlId)
  protected readonly hostClassName = createHostClassName(() => checkboxLabelClassName)
}
