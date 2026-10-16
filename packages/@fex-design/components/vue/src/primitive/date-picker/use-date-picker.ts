import type { CalendarValue } from '@fex-design/core/calendar'
import { createDatePicker, type DatePickerOptions } from '@fex-design/core/date-picker/create-date-picker'
import { definedPickerOptions } from '@fex-design/core/date-picker/options'
import { computed, watchEffect } from 'vue'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'

export type UseDatePickerOptions<TValue extends CalendarValue = CalendarValue> = DatePickerOptions<TValue>

export function useDatePicker<TValue extends CalendarValue = CalendarValue>(source: UseDatePickerOptions<TValue> | (() => UseDatePickerOptions<TValue>)) {
  const options = () => definedPickerOptions(typeof source === 'function' ? source() : source)
  const controller = createDatePicker<TValue>(options())
  const snapshot = useCoreStore(controller)
  // Track live props at the framework/core boundary; useCoreStore owns cleanup.
  watchEffect(() => controller.setOptions(options()))
  const state = computed(() => { snapshot.value; return controller.getState() })
  return {
    ...controller,
    controller,
    get triggerView() { return state.value.triggerView },
    get footerView() { return state.value.footerView },
    get canClear() { return state.value.canClear },
    get picker() { return state.value.picker },
    get needConfirm() { return state.value.needConfirm },
    get disabled() { return state.value.disabled },
    get clearable() { return state.value.clearable },
    get format() { return state.value.format },
    get weekStartsOn() { return state.value.weekStartsOn },
    get minDate() { return state.value.minDate },
    get maxDate() { return state.value.maxDate },
    get multiple() { return state.value.multiple },
    get maxCount() { return state.value.maxCount },
    open: computed(() => state.value.open),
    panel: computed(() => state.value.panel),
    viewDate: computed(() => state.value.viewDate),
    hoverValue: computed(() => state.value.hoverValue),
    previewValue: computed(() => state.value.previewValue),
    value: computed(() => state.value.value),
    calendarValue: computed(() => state.value.calendarValue),
    calendarValues: computed(() => state.value.calendarValues),
    inputValue: computed(() => state.value.inputValue),
    displayValue: computed(() => state.value.displayValue),
    canConfirm: computed(() => state.value.canConfirm),
    committedValue: computed(() => state.value.committedValue),
    pendingValue: computed(() => state.value.pendingValue),
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
