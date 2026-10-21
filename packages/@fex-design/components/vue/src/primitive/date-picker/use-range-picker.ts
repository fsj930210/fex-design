import type { CalendarValue } from '@fex-design/core/calendar'
import {
  createRangePicker,
  type RangePickerOptions,
} from '@fex-design/core/date-picker/create-range-picker'
import { definedPickerOptions } from '@fex-design/core/date-picker/options'
import { computed, watchEffect } from 'vue'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'

export type UseRangePickerOptions<TValue extends CalendarValue = CalendarValue> =
  RangePickerOptions<TValue>

export function useRangePicker<TValue extends CalendarValue = CalendarValue>(
  source: UseRangePickerOptions<TValue> | (() => UseRangePickerOptions<TValue>),
) {
  const options = () => definedPickerOptions(typeof source === 'function' ? source() : source)
  const controller = createRangePicker<TValue>(options())
  const snapshot = useCoreStore(controller)
  // Track live props at the framework/core boundary; useCoreStore owns cleanup.
  watchEffect(() => controller.setOptions(options()))
  const state = computed(() => {
    snapshot.value
    return controller.getState()
  })
  return {
    ...controller,
    controller,
    get showTime() {
      return state.value.showTime
    },
    get timeOptions() {
      return state.value.timeOptions
    },
    timeValue: computed(() => state.value.timeValue),
    get triggerView() {
      return state.value.triggerView
    },
    get focusRequest() {
      return state.value.focusRequest
    },
    get footerView() {
      return state.value.footerView
    },
    get canClear() {
      return state.value.canClear
    },
    get picker() {
      return state.value.picker
    },
    get needConfirm() {
      return state.value.needConfirm
    },
    get disabled() {
      return state.value.disabled
    },
    get clearable() {
      return state.value.clearable
    },
    get format() {
      return state.value.format
    },
    get weekStartsOn() {
      return state.value.weekStartsOn
    },
    get minDate() {
      return state.value.minDate
    },
    get maxDate() {
      return state.value.maxDate
    },
    get allowEmpty() {
      return state.value.allowEmpty
    },
    get order() {
      return state.value.order
    },
    open: computed(() => state.value.open),
    panel: computed(() => state.value.panel),
    viewDate: computed(() => state.value.viewDate),
    rangeValue: computed(() => state.value.rangeValue),
    activePart: computed(() => state.value.activePart),
    hoverValue: computed(() => state.value.hoverValue),
    previewValue: computed(() => state.value.previewValue),
    startText: computed(() => state.value.startText),
    endText: computed(() => state.value.endText),
    displayRange: computed(() => state.value.displayRange),
    canConfirm: computed(() => state.value.canConfirm),
    committedValue: computed(() => state.value.committedValue),
    pendingValue: computed(() => state.value.pendingValue),
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
