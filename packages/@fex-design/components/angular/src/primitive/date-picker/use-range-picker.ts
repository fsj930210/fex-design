import { computed, DestroyRef, inject, Injectable, signal, type Signal } from '@angular/core'
import type { CalendarValue } from '@fex-design/core/calendar'
import {
  createRangePicker,
  type RangePickerController,
  type RangePickerOptions,
} from '@fex-design/core/date-picker/create-range-picker'
import { definedPickerOptions } from '@fex-design/core/date-picker/options'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'

export type UseRangePickerOptions<TValue extends CalendarValue = CalendarValue> =
  RangePickerOptions<TValue>

@Injectable()
export class RangePickerState<TValue extends CalendarValue = CalendarValue> {
  private readonly destroyRef = inject(DestroyRef)
  private controllerValue?: RangePickerController<TValue>
  private readonly snapshot = signal<Signal<
    ReturnType<RangePickerController<TValue>['getSnapshot']>
  > | null>(null)
  private readonly state = computed(() => {
    this.snapshot()?.()
    return this.controller.getState()
  })
  get controller(): RangePickerController<TValue> {
    if (!this.controllerValue)
      throw new Error('RangePickerState requires initial options before use')
    return this.controllerValue
  }
  readonly picker = computed(() => this.state().picker)
  readonly needConfirm = computed(() => this.state().needConfirm)
  readonly open = computed(() => this.state().open)
  readonly panel = computed(() => this.state().panel)
  readonly viewDate = computed(() => this.state().viewDate)
  readonly activePart = computed(() => this.state().activePart)
  readonly hoverValue = computed(() => this.state().hoverValue)
  readonly previewValue = computed(() => this.state().previewValue)
  readonly rangeValue = computed(() => this.state().committedValue)
  readonly activeRangeValue = computed(() => this.state().rangeValue)

  setOptions(options: UseRangePickerOptions<TValue>) {
    const next = definedPickerOptions(options)
    if (!this.controllerValue) {
      this.controllerValue = createRangePicker<TValue>(next)
      this.snapshot.set(createCoreStoreSignal(this.controllerValue, this.destroyRef))
    } else this.controllerValue.setOptions(next)
  }
  readonly context = computed(() => ({
    ...this.state(),
    ...this.controller,
    controller: this.controller,
  }))
  readonly setOpen = (...args: Parameters<RangePickerController<TValue>['setOpen']>) =>
    this.controller.setOpen(...args)
  readonly setPanel = (...args: Parameters<RangePickerController<TValue>['setPanel']>) =>
    this.controller.setPanel(...args)
  readonly setViewDate = (...args: Parameters<RangePickerController<TValue>['setViewDate']>) =>
    this.controller.setViewDate(...args)
  readonly setActivePart = (...args: Parameters<RangePickerController<TValue>['setActivePart']>) =>
    this.controller.setActivePart(...args)
  readonly setHoverValue = (...args: Parameters<RangePickerController<TValue>['setHoverValue']>) =>
    this.controller.setHoverValue(...args)
  readonly previewCell = (...args: Parameters<RangePickerController<TValue>['previewCell']>) =>
    this.controller.previewCell(...args)
  readonly openPanel = (...args: Parameters<RangePickerController<TValue>['openPanel']>) =>
    this.controller.openPanel(...args)
  readonly today = (...args: Parameters<RangePickerController<TValue>['today']>) =>
    this.controller.today(...args)
  readonly close = (...args: Parameters<RangePickerController<TValue>['close']>) =>
    this.controller.close(...args)
  readonly clear = (...args: Parameters<RangePickerController<TValue>['clear']>) =>
    this.controller.clear(...args)
  readonly confirm = (...args: Parameters<RangePickerController<TValue>['confirm']>) =>
    this.controller.confirm(...args)
  readonly cancel = (...args: Parameters<RangePickerController<TValue>['cancel']>) =>
    this.controller.cancel(...args)
  readonly selectTime = (...args: Parameters<RangePickerController<TValue>['selectTime']>) =>
    this.controller.selectTime(...args)
  readonly select = (...args: Parameters<RangePickerController<TValue>['select']>) =>
    this.controller.select(...args)
}
