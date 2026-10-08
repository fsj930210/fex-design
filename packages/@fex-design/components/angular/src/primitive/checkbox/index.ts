import { createCheckboxGroupController } from '@fex-design/core/checkbox/create-checkbox-group-controller'
import type { CheckboxGroupChangeMeta, CheckboxValue } from '@fex-design/core/checkbox/types'
import {
  checkboxCheckIconClassName,
  checkboxControlClassName,
  checkboxGroupClassName,
  checkboxIndicatorClassName,
  checkboxLabelClassName,
  checkboxMinusIconClassName,
  checkboxRootClassName,
} from '@fex-design/components-styles/checkbox'
import { cn } from '@fex-design/utils'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'
let checkboxId = 0
@Component({
  selector: 'div[checkboxRoot]',
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
export class CheckboxGroup {
  value = input<CheckboxValue[] | undefined>()
  defaultValue = input<CheckboxValue[] | undefined>()
  disabled = input(false, { transform: booleanAttribute })
  orientation = input<'horizontal' | 'vertical'>('vertical')
  change = output<{ value: CheckboxValue[]; meta: CheckboxGroupChangeMeta }>()
  private readonly controller = (() => {
    const owner = this
    return createCheckboxGroupController({
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
  })()
  private readonly snapshot = createCoreStoreSignal(this.controller)
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
export class CheckboxControl {
  id = input<string | undefined>()
  value = input<CheckboxValue | undefined>()
  name = input<string | undefined>()
  checked = input<boolean | undefined>()
  defaultChecked = input(false, { transform: booleanAttribute })
  disabled = input(false, { transform: booleanAttribute })
  indeterminate = input(false, { transform: booleanAttribute })
  private readonly element = inject<ElementRef<HTMLInputElement>>(ElementRef)
  readonly root = inject(CheckboxRoot, { optional: true })
  readonly group = inject(CheckboxGroup, { optional: true })
  private readonly interacted = signal(false)
  private readonly internalChecked = signal(false)
  protected readonly hostClassName = createHostClassName(() => checkboxControlClassName)
  protected readonly resolvedId = computed(() => this.id() ?? this.root?.controlId)
  private readonly resolvedValue = computed(() => this.value() ?? this.root?.value())
  protected readonly resolvedChecked = computed(() => {
    const value = this.resolvedValue()
    if (this.group && value !== undefined) return this.group.currentValue().includes(value)
    return (
      this.checked() ??
      (this.interacted() ? this.internalChecked() : (this.defaultChecked() ?? false))
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
    if (this.checked() === undefined && !this.group) {
      this.interacted.set(true)
      this.internalChecked.set(input.checked)
    }
    if (!event.defaultPrevented && this.group && value !== undefined) this.group.toggle(value)
  }
}
@Component({
  selector: 'span[checkboxIndicator]',
  standalone: true,
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
