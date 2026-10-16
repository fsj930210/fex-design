import { mergePickerStyle } from './style'
import { getPickerAppearance } from './appearance-context'
import type { DatePickerInputProps, DatePickerEndpointProps } from './appearance.types'
import { getPickerInputProps, getPickerControlProps } from '@fex-design/core/date-picker/safe-props'
import { cn } from '@fex-design/utils'
import { createHostStyle } from '@fex-design/angular/signals/host-style'
import { connectNativeAttributes, type NativeAttributes } from '@fex-design/angular/directives/native-attributes'
import { focusDatePickerInput, getDatePickerInputAttributes } from '@fex-design/core/date-picker/input'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import { type InputAttributes, InputRoot, InputControl, InputPrefix, InputSuffix } from '@fex-design/angular/primitive/input'
import { listenNativeEvent } from '@fex-design/angular/directives/listen-native-event'
import { getDatePickerInputPart, getRangePickerInputPlaceholder, getRangePickerSeparator, isPickerContentProvided } from '@fex-design/core/date-picker/view'
import { afterRenderEffect, untracked, ChangeDetectionStrategy, Component, computed, contentChild, ElementRef, inject, Injector, input, TemplateRef, type AfterViewInit, type OnDestroy } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'

import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { CalendarIcon } from '@fex-design/angular/icons/calendar'
import { CircleXIcon } from '@fex-design/angular/icons/circle-x'
import { inputClearClassName } from '@fex-design/components-styles/input'

import { Popover } from '@fex-design/angular/primitive/popover'
import { eventInfo } from '../popover/event-info'
import { RangePickerRoot } from './range-picker-root'
import { datePickerAffixClassName, datePickerRangeFieldClassName, datePickerRangeTriggerClassName, datePickerInputPreviewClassName, datePickerRangeInputClassName, datePickerRangeInputControlClassName, datePickerRangeSeparatorClassName } from '@fex-design/components-styles/date-picker'

@Component({
  selector: 'div[rangePickerTrigger]',
  exportAs: 'rangePickerTrigger',
  standalone: true,
  imports: [NgTemplateOutlet, InputRoot, InputControl, InputPrefix, InputSuffix, CalendarIcon, CircleXIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'range-picker-trigger', 'aria-haspopup': 'dialog', '[attr.aria-expanded]': 'context().open', '[attr.data-state]': "context().open ? 'open' : 'closed'" },
  templateUrl: './range-picker-trigger.html',
})
export class RangePickerTrigger implements AfterViewInit, OnDestroy {
  readonly size = input<InputSize>()
  readonly variant = input<InputVariant>()
  readonly triggerProps = input<NativeAttributes>()
  readonly inputProps = input<DatePickerInputProps>()
  protected readonly appearance = getPickerAppearance()
  readonly inputConfig = computed(() => getPickerInputProps(this.inputProps() ?? this.appearance().inputProps))
  readonly inputSize = computed(() => this.size() ?? this.inputConfig().size ?? 'md')
  readonly inputVariant = computed(() => this.variant() ?? this.inputConfig().variant ?? 'outlined')
  protected readonly nativeStyle = createHostStyle()
  readonly inputRootStyle = computed(() => mergePickerStyle(this.inputConfig().styles?.root, this.inputConfig().style, this.nativeStyle()))
  protected readonly cn = cn
  readonly startInputProps = input<DatePickerEndpointProps>()
  readonly endInputProps = input<DatePickerEndpointProps>()
  readonly resolvedInputProps = computed(() => getDatePickerInputAttributes(getPickerControlProps(this.inputConfig())) as InputAttributes)
  readonly startConfig = computed(() => getPickerControlProps(this.inputConfig(), this.startInputProps() ?? this.appearance().startInputProps, true))
  readonly resolvedStartInputProps = computed(() => getDatePickerInputAttributes(this.startConfig()) as InputAttributes)
  readonly startPlaceholderValue = computed(() => this.startPlaceholder() ?? this.startConfig().placeholder)
  readonly startStyle = computed(() => mergePickerStyle(this.inputConfig().styles?.control, this.startConfig().style))
  readonly endConfig = computed(() => getPickerControlProps(this.inputConfig(), this.endInputProps() ?? this.appearance().endInputProps, true))
  readonly resolvedEndInputProps = computed(() => getDatePickerInputAttributes(this.endConfig()) as InputAttributes)
  readonly endPlaceholderValue = computed(() => this.endPlaceholder() ?? this.endConfig().placeholder)
  readonly endStyle = computed(() => mergePickerStyle(this.inputConfig().styles?.control, this.endConfig().style))
  readonly startPlaceholder = input<string>()
  readonly endPlaceholder = input<string>()
  readonly separator = input<string>()
  readonly prefixValue = computed(() => this.inputConfig().prefix)
  readonly prefixTemplate = computed(() => this.prefixValue() instanceof TemplateRef ? this.prefixValue() as TemplateRef<unknown> : null)
  readonly suffix = input<string | number | TemplateRef<unknown>>()
  readonly suffixValue = computed(() => this.suffix() ?? this.inputConfig().suffix)
  readonly suffixTemplate = computed(() => this.suffixValue() instanceof TemplateRef ? this.suffixValue() as TemplateRef<unknown> : null)
  readonly injector = inject(Injector)
  readonly root = inject(RangePickerRoot)
  readonly template = contentChild<TemplateRef<unknown>>(TemplateRef)
  readonly context = computed(() => this.root.state.context())
  private readonly focusRequest = computed(() => this.context().focusRequest)
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  private reference: HTMLElement | null = this.element
  private readonly localPopover = inject(Popover, { optional: true })
  private ownedPopover() { return this.root.containerTemplate() && this.localPopover === this.root.popover ? null : this.localPopover }
  private registerReference(element: HTMLElement | null) {
    const popover = this.ownedPopover()
    if (!popover) return
    popover.referenceElement = element
    popover.overlay.setReferenceElement(element)
  }
  protected readonly hostClassName = createHostClassName('block w-full min-w-0')
  protected readonly triggerClassName = createHostClassName(() => cn(datePickerRangeTriggerClassName, this.inputConfig().classNames?.root, this.inputConfig().class))
  protected readonly previewClassName = datePickerInputPreviewClassName
  protected readonly affixClassName = datePickerAffixClassName
  protected readonly fieldClassName = datePickerRangeFieldClassName
  protected readonly clearClassName = inputClearClassName
  protected readonly rangeInputClassName = datePickerRangeInputClassName
  protected readonly inputClassName = datePickerRangeInputControlClassName
  protected readonly separatorClassName = datePickerRangeSeparatorClassName
  ngAfterViewInit() { this.registerReference(this.reference) }
  ngOnDestroy() { if (this.ownedPopover()?.referenceElement === this.reference) this.registerReference(null) }
  protected readonly isContentProvided = isPickerContentProvided
  protected readonly inputPlaceholder = getRangePickerInputPlaceholder
  protected readonly rangeSeparator = getRangePickerSeparator
  constructor() {
    // Apply core focus requests after input DOM updates; no selection logic belongs here.
    afterRenderEffect(() => {
      const request = this.focusRequest()
      untracked(() => { if (request && this.context().open && !this.template()) focusDatePickerInput(this.reference, request.part) })
    })
    connectNativeAttributes(this.triggerProps, { handledEvents: ['onClick', 'onFocus'], exclude: ['data-state', 'aria-expanded', 'aria-haspopup', 'data-slot'] })
    listenNativeEvent('click', event => { if (!this.template()) this.open(event) })
    listenNativeEvent('focusin', event => {
      if (!this.template() && event.target instanceof HTMLInputElement) this.focus(event, getDatePickerInputPart(event.target.closest('[data-range-part]')?.getAttribute('data-range-part')))
    })
  }
  readonly ref = (element: HTMLElement | null) => { this.reference = element; this.registerReference(element) }
  open(event: Event, part?: 'start' | 'end') {
    this.triggerProps()?.onClick?.(event as MouseEvent)
    if (event.defaultPrevented) return
    const targetPart = event.target instanceof Element ? getDatePickerInputPart(event.target.closest('[data-range-part]')?.getAttribute('data-range-part')) : undefined
    this.root.state.openPanel(part ?? targetPart)
  }
  focus(event: Event, part?: 'start' | 'end') {
    this.triggerProps()?.onFocus?.(event as FocusEvent)
    if (event.defaultPrevented || this.context().disabled) return
    if (part) this.root.state.setActivePart(part)
    const popover = this.ownedPopover()
    if (!popover) { this.root.state.openPanel(part); return }
    popover.syncOptions()
    popover.overlay.trigger.focus(eventInfo(event))
    if (part && this.context().open) this.root.state.openPanel(part)
  }
  clear(event: Event) { event.preventDefault(); event.stopPropagation(); this.root.state.clear() }
}
