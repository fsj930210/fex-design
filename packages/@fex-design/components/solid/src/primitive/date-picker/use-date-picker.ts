import type { CalendarValue } from '@fex-design/core/calendar'
import { createDatePicker, type DatePickerOptions } from '@fex-design/core/date-picker/create-date-picker'
import { definedPickerOptions } from '@fex-design/core/date-picker/options'
import { createEffect, createMemo } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'

export type UseDatePickerOptions<TValue extends CalendarValue = CalendarValue> = DatePickerOptions<TValue>

export function useDatePicker<TValue extends CalendarValue = CalendarValue>(options: UseDatePickerOptions<TValue>) {
  const controller = createDatePicker<TValue>(definedPickerOptions(options))
  const snapshot = createCoreStoreSignal(controller)
  // Synchronize reactive props with the external controller; the store helper cleans up.
  createEffect(() => controller.setOptions(definedPickerOptions(options)))
  const state = createMemo(() => { snapshot(); return controller.getState() })
  return {
    ...controller,
    controller,
    get showTime() { return state().showTime },
    get timeOptions() { return state().timeOptions },
    timeValue: () => state().timeValue,
    get triggerView() { return state().triggerView },
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
    get multiple() { return state().multiple },
    get maxCount() { return state().maxCount },
    open: () => state().open,
    panel: () => state().panel,
    viewDate: () => state().viewDate,
    hoverValue: () => state().hoverValue,
    previewValue: () => state().previewValue,
    value: () => state().value,
    calendarValue: () => state().calendarValue,
    calendarValues: () => state().calendarValues,
    inputValue: () => state().inputValue,
    displayValue: () => state().displayValue,
    canConfirm: () => state().canConfirm,
    committedValue: () => state().committedValue,
    pendingValue: () => state().pendingValue,
    disabledDate: (date: Parameters<ReturnType<typeof controller.getState>['disabledDate']>[0]) => controller.getState().disabledDate(date),
    setOpen: controller.setOpen,
    setPanel: controller.setPanel,
    setViewDate: controller.setViewDate,
    openPanel: controller.openPanel,
    close: controller.close,
    clear: controller.clear,
    confirm: controller.confirm,
    cancel: controller.cancel,
    select: controller.select,
  }
}
