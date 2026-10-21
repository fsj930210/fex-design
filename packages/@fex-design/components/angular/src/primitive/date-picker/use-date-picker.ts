import { computed, DestroyRef, inject, Injectable, signal, type Signal } from '@angular/core'
import type { CalendarValue } from '@fex-design/core/calendar'
import {
  createDatePicker,
  type DatePickerController,
  type DatePickerOptions,
} from '@fex-design/core/date-picker/create-date-picker'
import { definedPickerOptions } from '@fex-design/core/date-picker/options'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'
import { getCalendarValueKey } from '@fex-design/core/calendar/value'

export type UseDatePickerOptions<TValue extends CalendarValue = CalendarValue> =
  DatePickerOptions<TValue>

@Injectable()
export class DatePickerState<TValue extends CalendarValue = CalendarValue> {
  private readonly destroyRef = inject(DestroyRef)
  private controllerValue?: DatePickerController<TValue>
  private readonly snapshot = signal<Signal<
    ReturnType<DatePickerController<TValue>['getSnapshot']>
  > | null>(null)
  private readonly state = computed(() => {
    this.snapshot()?.()
    return this.controller.getState()
  })
  get controller(): DatePickerController<TValue> {
    if (!this.controllerValue)
      throw new Error('DatePickerState requires initial options before use')
    return this.controllerValue
  }
  readonly picker = computed(() => this.state().picker)
  readonly multiple = computed(() => this.state().multiple)
  readonly needConfirm = computed(() => this.state().needConfirm)
  readonly open = computed(() => this.state().open)
  readonly panel = computed(() => this.state().panel)
  readonly viewDate = computed(() => this.state().viewDate)
  readonly hoverValue = computed(() => this.state().hoverValue)
  readonly previewValue = computed(() => this.state().previewValue)
  readonly calendarValue = computed(() => this.state().calendarValue)
  readonly calendarValues = computed(() => this.state().calendarValues)
  readonly currentValue = computed(() => this.state().committedValue)
  readonly activeValue = computed(() => this.state().value)

  setOptions(options: UseDatePickerOptions<TValue>) {
    const next = definedPickerOptions(options)
    if (!this.controllerValue) {
      this.controllerValue = createDatePicker<TValue>(next)
      this.snapshot.set(createCoreStoreSignal(this.controllerValue, this.destroyRef))
    } else this.controllerValue.setOptions(next)
  }
  readonly context = computed(() => ({
    ...this.state(),
    ...this.controller,
    controller: this.controller,
  }))
  readonly setOpen = (...args: Parameters<DatePickerController<TValue>['setOpen']>) =>
    this.controller.setOpen(...args)
  readonly setPanel = (...args: Parameters<DatePickerController<TValue>['setPanel']>) =>
    this.controller.setPanel(...args)
  readonly setViewDate = (...args: Parameters<DatePickerController<TValue>['setViewDate']>) =>
    this.controller.setViewDate(...args)
  readonly setHoverValue = (...args: Parameters<DatePickerController<TValue>['setHoverValue']>) =>
    this.controller.setHoverValue(...args)
  readonly previewCell = (...args: Parameters<DatePickerController<TValue>['previewCell']>) =>
    this.controller.previewCell(...args)
  readonly openPanel = (...args: Parameters<DatePickerController<TValue>['openPanel']>) =>
    this.controller.openPanel(...args)
  readonly today = (...args: Parameters<DatePickerController<TValue>['today']>) =>
    this.controller.today(...args)
  readonly close = (...args: Parameters<DatePickerController<TValue>['close']>) =>
    this.controller.close(...args)
  readonly clear = (...args: Parameters<DatePickerController<TValue>['clear']>) =>
    this.controller.clear(...args)
  readonly confirm = (...args: Parameters<DatePickerController<TValue>['confirm']>) =>
    this.controller.confirm(...args)
  readonly cancel = (...args: Parameters<DatePickerController<TValue>['cancel']>) =>
    this.controller.cancel(...args)
  readonly selectTime = (...args: Parameters<DatePickerController<TValue>['selectTime']>) =>
    this.controller.selectTime(...args)
  readonly select = (...args: Parameters<DatePickerController<TValue>['select']>) =>
    this.controller.select(...args)
}

export const getSelectionDisplayKey = getCalendarValueKey
