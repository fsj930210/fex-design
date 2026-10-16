import type { CalendarValue } from '@fex-design/core/calendar'
import { createRangePicker, type RangePickerOptions } from '@fex-design/core/date-picker/create-range-picker'
import { definedPickerOptions } from '@fex-design/core/date-picker/options'
import { createEffect, createMemo } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'

export type UseRangePickerOptions<TValue extends CalendarValue = CalendarValue> = RangePickerOptions<TValue>

export function useRangePicker<TValue extends CalendarValue = CalendarValue>(options: UseRangePickerOptions<TValue>) {
  const controller = createRangePicker<TValue>(definedPickerOptions(options))
  const snapshot = createCoreStoreSignal(controller)
  // Synchronize reactive props with the external controller; the store helper cleans up.
  createEffect(() => controller.setOptions(definedPickerOptions(options)))
  const state = createMemo(() => { snapshot(); return controller.getState() })
  return {
    ...controller,
    controller,
    get triggerView() { return state().triggerView },
    get focusRequest() { return state().focusRequest },
    get footerView() { return state().footerView },
    get canClear() { return state().canClear },
    get picker() { return state().picker },
    get needConfirm() { return state().needConfirm },
    get disabled() { return state().disabled },
    get clearable() { return state().clearable },
    get format() { return state().format },
    get weekStartsOn() { return state().weekStartsOn },
    get minDate() { return state().minDate },
    get maxDate() { return state().maxDate },
    get allowEmpty() { return state().allowEmpty },
    get order() { return state().order },
    open: () => state().open,
    panel: () => state().panel,
    viewDate: () => state().viewDate,
    rangeValue: () => state().rangeValue,
    activePart: () => state().activePart,
    hoverValue: () => state().hoverValue,
    previewValue: () => state().previewValue,
    startText: () => state().startText,
    endText: () => state().endText,
    displayRange: () => state().displayRange,
    canConfirm: () => state().canConfirm,
    committedValue: () => state().committedValue,
    pendingValue: () => state().pendingValue,
    disabledDate: controller.getState().disabledDate,
    setOpen: controller.setOpen,
    setPanel: controller.setPanel,
    setViewDate: controller.setViewDate,
    setActivePart: controller.setActivePart,
    setHoverValue: controller.setHoverValue,
    openPanel: controller.openPanel,
    close: controller.close,
    clear: controller.clear,
    confirm: controller.confirm,
    cancel: controller.cancel,
    select: controller.select,
  }
}
