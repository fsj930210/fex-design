import {
  afterRenderEffect,
  ElementRef,
  untracked,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  TemplateRef,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { TimePickerPrefixTemplate } from './time-picker-prefix-template'
import { TimePickerSuffixTemplate } from './time-picker-suffix-template'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import type { TimeRangePart } from '@fex-design/core/time-picker/range-types'
import type { TimeValue } from '@fex-design/core/time-picker/types'
import { format } from '@fex-design/core/date/utils'
import { filterTimePickerInputProps } from '@fex-design/core/time-picker/input-props'
import { inputControlClassName } from '@fex-design/components-styles/input'
import {
  timePickerAffixClassName,
  timeRangePickerInputClassName,
} from '@fex-design/components-styles/time-picker'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { NativeAttributesDirective } from '@fex-design/angular/directives/native-attributes'
import { ClockIcon } from '@fex-design/angular/icons/clock'
import { cn } from '@fex-design/utils'
import { InputRoot, InputPrefix, InputSuffix, InputClear } from '../input'
import { PopoverTrigger } from '../popover'
import type { TimePickerInputProps } from './time-picker-input-props'
import { TimeRangePickerRoot } from './time-range-picker-root'

@Component({
  selector: 'div[timeRangePickerTrigger]',
  standalone: true,
  hostDirectives: [PopoverTrigger],
  imports: [
    InputRoot,
    InputPrefix,
    InputSuffix,
    InputClear,
    ClockIcon,
    NativeAttributesDirective,
    NgTemplateOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()' },
  templateUrl: './time-range-picker-trigger.html',
})
export class TimeRangePickerTrigger {
  protected readonly hostClassName = createHostClassName('block w-full min-w-0')
  readonly root = inject(TimeRangePickerRoot)
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef)
  constructor() {
    // Synchronize the core focus request after the endpoint DOM updates.
    afterRenderEffect(() => {
      const request = this.root.rangeSnapshot().focusRequest
      untracked(() => {
        if (this.root.rangeSnapshot().open && request)
          this.element.nativeElement
            .querySelector<HTMLInputElement>('input[data-range-part="' + request.part + '"]')
            ?.focus({ preventScroll: true })
      })
    })
  }
  readonly size = input<InputSize>()
  readonly variant = input<InputVariant>()
  readonly startInputProps = input<TimePickerInputProps>()
  readonly endInputProps = input<TimePickerInputProps>()
  readonly placeholder = input<readonly [string, string]>()
  readonly allowClear = input(true, { transform: booleanAttribute })
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
  readonly parts = ['start', 'end'] as const
  readonly affixClassName = timePickerAffixClassName
  readonly canClear = computed(
    () =>
      this.allowClear() &&
      this.root.rangeSnapshot().draft.some(Boolean) &&
      !this.root.disabled() &&
      !this.root.readOnly(),
  )
  native(part: TimeRangePart) {
    return filterTimePickerInputProps(
      part === 'start' ? this.startInputProps() : this.endInputProps(),
    )
  }
  inputClass(part: TimeRangePart) {
    return cn(inputControlClassName, timeRangePickerInputClassName, this.native(part).class)
  }
  display(value: TimeValue | null) {
    return value ? format(value, this.root.resolvedFormat()) : ''
  }
  text(part: TimeRangePart) {
    const range = this.root.rangeSnapshot()
    return range.open && range.activePart === part
      ? this.root.snapshot().inputValue
      : this.display(range.draft[part === 'start' ? 0 : 1])
  }
  activate(part: TimeRangePart) {
    this.root.range.controller.activate(part)
    const value = this.root.range.controller.getSnapshot().draft[part === 'start' ? 0 : 1]
    this.root.controller.setControlledValue(value)
    this.root.controller.resetInput()
    this.root.controller.scrollToValue('auto')
  }
  open() {
    if (!this.root.range.controller.getSnapshot().open) {
      const current = this.root.range.controller.getSnapshot()
      this.root.controller.setControlledValue(current.draft[current.activePart === 'start' ? 0 : 1])
      this.root.controller.resetInput()
    }
    this.root.range.controller.setOpen(true)
  }
  clear(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    this.root.controller.clear()
    this.root.range.controller.clear()
  }
}
