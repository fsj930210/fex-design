import type { CalendarValue } from '@fex-design/core/calendar'
import {
  createDatePicker,
  type DatePickerOptions,
} from '@fex-design/core/date-picker/create-date-picker'
import { definedPickerOptions } from '@fex-design/core/date-picker/options'
import { readableCoreStore } from '@fex-design/svelte/stores/core-store'
import { fromStore } from 'svelte/store'

export type UseDatePickerOptions<TValue extends CalendarValue = CalendarValue> =
  DatePickerOptions<TValue>

export function useDatePicker<TValue extends CalendarValue = CalendarValue>(
  source: UseDatePickerOptions<TValue> | (() => UseDatePickerOptions<TValue>),
) {
  const options = () => definedPickerOptions(typeof source === 'function' ? source() : source)
  const controller = createDatePicker<TValue>(options())
  const snapshot = fromStore(readableCoreStore(controller))
  // $props is an external source for core. The readable store owns subscription cleanup.
  $effect(() => controller.setOptions(options()))
  function state() {
    snapshot.current
    return controller.getState()
  }
  return {
    ...controller,
    controller,
    get showTime() {
      return state().showTime
    },
    get timeOptions() {
      return state().timeOptions
    },
    getTimeValue: () => state().timeValue,
    get triggerView() {
      return state().triggerView
    },
    get footerView() {
      return state().footerView
    },
    get canClear() {
      return state().canClear
    },
    get picker() {
      return state().picker
    },
    get needConfirm() {
      return state().needConfirm
    },
    get disabled() {
      return state().disabled
    },
    get clearable() {
      return state().clearable
    },
    get format() {
      return state().format
    },
    get weekStartsOn() {
      return state().weekStartsOn
    },
    get minDate() {
      return state().minDate
    },
    get maxDate() {
      return state().maxDate
    },
    get multiple() {
      return state().multiple
    },
    get maxCount() {
      return state().maxCount
    },
    getOpen: () => state().open,
    getPanel: () => state().panel,
    getViewDate: () => state().viewDate,
    getHoverValue: () => state().hoverValue,
    getPreviewValue: () => state().previewValue,
    getValue: () => state().value,
    getCalendarValue: () => state().calendarValue,
    getCalendarValues: () => state().calendarValues,
    getInputValue: () => state().inputValue,
    getDisplayValue: () => state().displayValue,
    getCanConfirm: () => state().canConfirm,
    getCommittedValue: () => state().committedValue,
    getPendingValue: () => state().pendingValue,
    disabledDate: (date: Parameters<ReturnType<typeof controller.getState>['disabledDate']>[0]) =>
      controller.getState().disabledDate(date),
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
