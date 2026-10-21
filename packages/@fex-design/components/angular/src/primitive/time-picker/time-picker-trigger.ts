import { filterTimePickerInputProps } from '@fex-design/core/time-picker/input-props'
import type { TimePickerInputProps } from './time-picker-input-props'
import { timePickerAffixClassName } from '@fex-design/components-styles/time-picker'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  computed,
  ElementRef,
  inject,
  input,
  TemplateRef,
  HostListener,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { ClockIcon } from '@fex-design/angular/icons/clock'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import {
  InputClear,
  InputControl,
  InputPrefix,
  InputRoot,
  InputSuffix,
  type InputAttributes,
} from '../input'
import { PopoverTrigger } from '../popover'
import { TimePickerRoot } from './time-picker-root'
import { TimePickerPrefixTemplate } from './time-picker-prefix-template'
import { TimePickerSuffixTemplate } from './time-picker-suffix-template'

@Component({
  selector: 'div[timePickerTrigger], button[timePickerTrigger]',
  exportAs: 'timePickerTrigger',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    InputRoot,
    InputControl,
    InputClear,
    InputPrefix,
    InputSuffix,
    ClockIcon,
  ],
  hostDirectives: [PopoverTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[attr.disabled]': "nativeTrigger && root.disabled() ? '' : null",
  },
  templateUrl: './time-picker-trigger.html',
})
export class TimePickerTrigger {
  readonly inputRootProps = input<{
    class?: string | undefined
    style?: string | Record<string, string | number | null | undefined> | undefined
  }>()
  protected readonly affixClassName = timePickerAffixClassName
  protected readonly nativeTrigger =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName === 'BUTTON'
  protected readonly hostClassName = createHostClassName(() =>
    this.nativeTrigger ? '' : 'block w-full min-w-0',
  )
  readonly root = inject(TimePickerRoot)
  readonly allowClear = input(true, { transform: booleanAttribute })
  readonly placeholder = input<string>()
  readonly invalid = input(false, { transform: booleanAttribute })
  readonly size = input<InputSize>()
  readonly variant = input<InputVariant>()
  readonly inputProps = input<TimePickerInputProps>()
  readonly canClear = computed(
    () =>
      this.allowClear() &&
      Boolean(this.root.snapshot().inputValue) &&
      !this.root.disabled() &&
      !this.root.readOnly(),
  )
  readonly resolvedInputProps = computed<InputAttributes>(() => ({
    ...filterTimePickerInputProps(this.inputProps()),
    type: 'text',
    'aria-label': this.inputProps()?.['aria-label'] ?? 'Time',
    'aria-invalid': this.invalid() || this.inputProps()?.['aria-invalid'],
    placeholder:
      this.placeholder() ?? this.inputProps()?.['placeholder'] ?? this.root.resolvedFormat(),
  }))
  readonly prefix = input<string | number | TemplateRef<unknown>>()
  readonly suffix = input<string | number | TemplateRef<unknown>>()
  readonly prefixSlot = contentChild(TimePickerPrefixTemplate)
  readonly suffixSlot = contentChild(TimePickerSuffixTemplate)
  readonly prefixValue = computed(() => this.prefix() ?? this.prefixSlot()?.template)
  readonly suffixValue = computed(() => this.suffix() ?? this.suffixSlot()?.template)
  readonly prefixTemplate = computed(() =>
    this.prefixValue() instanceof TemplateRef ? (this.prefixValue() as TemplateRef<unknown>) : null,
  )
  readonly suffixTemplate = computed(() =>
    this.suffixValue() instanceof TemplateRef ? (this.suffixValue() as TemplateRef<unknown>) : null,
  )
  readonly custom = contentChild<TemplateRef<unknown>>('trigger')
  private readonly trigger = inject(PopoverTrigger)
  @HostListener('focusin', ['$event']) focus(event: Event) {
    if (!this.nativeTrigger) this.trigger.focus(event)
  }
  @HostListener('focusout', ['$event']) blur(event: Event) {
    if (!this.nativeTrigger) this.trigger.blur(event)
  }
  inputText(value: string) {
    this.root.controller.input(value)
  }
  clear(event?: Event) {
    event?.preventDefault()
    event?.stopPropagation()
    this.root.controller.clear()
  }
}
