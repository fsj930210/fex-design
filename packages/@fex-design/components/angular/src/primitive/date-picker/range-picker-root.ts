import { showTimeInput } from './show-time-input'
import type { DatePickerStyle } from './style'
import { PickerAppearanceToken } from './appearance-context'
import type { DatePickerInputProps, DatePickerEndpointProps, DatePickerCalendarProps, DatePickerPopoverProps, PickerAppearance } from './appearance.types'
import type { DatePickerClassNames, DatePickerStyles } from '@fex-design/core/date-picker/appearance'
import { PickerContainerToken } from './container-context'
import { PickerOwnerToken } from './owner-context'
import { optionalPickerBoolean } from './boolean-input'
import { ChangeDetectionStrategy, Component, computed, DestroyRef, contentChild, inject, input, output, TemplateRef, type OnChanges, type OnInit } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import type { CalendarDate, CalendarRange, CalendarValue, CalendarWeekday } from '@fex-design/core/calendar'
import type { DatePickerPicker, DatePickerDisabledTime, DatePickerDisabledDateInfo } from '@fex-design/core/date-picker/types'
import { definedPickerOptions, getDatePickerPopoverOptions } from '@fex-design/core/date-picker/options'
import { Popover } from '@fex-design/angular/primitive/popover'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { RangePickerState, type UseRangePickerOptions } from './use-range-picker'


@Component({
  selector: 'div[rangePickerRoot]',
  exportAs: 'rangePickerRoot',
  standalone: true,
  imports: [NgTemplateOutlet],
  hostDirectives: [Popover],
  providers: [{ provide: PickerAppearanceToken, useFactory: () => inject(RangePickerRoot).appearance }, RangePickerState, { provide: PickerOwnerToken, useExisting: RangePickerState }, { provide: PickerContainerToken, useFactory: () => inject(RangePickerRoot) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './range-picker-root.html',
  host: { '[class]': 'hostClassName()' },
})
export class RangePickerRoot<TValue extends CalendarValue = CalendarValue> implements OnInit, OnChanges {
  protected readonly hostClassName = createHostClassName('block w-full min-w-0')
  readonly picker = input<DatePickerPicker>()
  readonly value = input<CalendarRange<TValue>>()
  readonly defaultValue = input<CalendarRange<TValue>>()
  readonly open = input(undefined, { transform: optionalPickerBoolean })
  readonly defaultOpen = input(undefined, { transform: optionalPickerBoolean })
  readonly showTime = input(undefined, { transform: showTimeInput })
  readonly disabledTime = input<DatePickerDisabledTime>()
  readonly needConfirm = input(undefined, { transform: optionalPickerBoolean })
  readonly disabled = input(undefined, { transform: optionalPickerBoolean })
  readonly clearable = input(undefined, { transform: optionalPickerBoolean })
  readonly format = input<string>()
  readonly weekStartsOn = input<CalendarWeekday>()
  readonly minDate = input<CalendarDate>()
  readonly maxDate = input<CalendarDate>()
  readonly disabledDate = input<(date: CalendarDate, info: DatePickerDisabledDateInfo) => boolean>()
  readonly allowEmpty = input<boolean | { start?: boolean; end?: boolean }>()
  readonly order = input(undefined, { transform: optionalPickerBoolean })
  readonly popoverProps = input<DatePickerPopoverProps>()
  readonly inputProps = input<DatePickerInputProps>()
  readonly startInputProps = input<DatePickerEndpointProps>()
  readonly endInputProps = input<DatePickerEndpointProps>()
  readonly calendarProps = input<DatePickerCalendarProps>()
  readonly classNames = input<DatePickerClassNames>()
  readonly styles = input<DatePickerStyles<DatePickerStyle>>()
  readonly appearance = computed<PickerAppearance>(() => ({ inputProps: this.inputProps(), startInputProps: this.startInputProps(), endInputProps: this.endInputProps(), calendarProps: this.calendarProps(), popoverProps: this.popoverProps(), classNames: this.classNames(), styles: this.styles() }))
  readonly change = output<CalendarRange<TValue>>()
  readonly openChange = output<boolean>()
  private readonly destroyRef = inject(DestroyRef)
  readonly state = inject(RangePickerState<TValue>)
  readonly popover = inject(Popover)
  readonly containerTemplate = contentChild<TemplateRef<unknown>>('container')
  readonly context = computed(() => this.state.context())
  private readonly onChange = (value: CalendarRange<TValue>) => this.change.emit(value)
  private readonly onOpenChange = (open: boolean) => this.openChange.emit(open)
  constructor() {
    const subscription = this.popover.openChange.subscribe(open => this.state.setOpen(open))
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
  ngOnChanges() { this.state.setOptions(this.options()) }
  ngOnInit() {
    this.state.setOptions(this.options())
    this.popover.connectOptions(() => ({ ...getDatePickerPopoverOptions(this.popoverProps()), open: this.containerTemplate() ? false : this.context().open, disabled: this.containerTemplate() ? true : this.context().disabled }))
  }
  registerTrigger(element: HTMLElement | null) {
    this.popover.referenceElement = element
    this.popover.overlay.setReferenceElement(element)
  }
  private options(): UseRangePickerOptions<TValue> {
    return definedPickerOptions({
      picker: this.picker(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      open: this.open(),
      defaultOpen: this.defaultOpen(),
      showTime: this.showTime(),
      disabledTime: this.disabledTime(),
      needConfirm: this.needConfirm(),
      disabled: this.disabled(),
      clearable: this.clearable(),
      format: this.format(),
      weekStartsOn: this.weekStartsOn(),
      minDate: this.minDate(),
      maxDate: this.maxDate(),
      disabledDate: this.disabledDate(),
      allowEmpty: this.allowEmpty(),
      order: this.order(),
      onChange: this.onChange,
      onOpenChange: this.onOpenChange,
    })
  }
}
