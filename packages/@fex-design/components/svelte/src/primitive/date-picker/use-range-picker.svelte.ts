import type { CalendarValue } from '@fex-design/core/calendar'
import { createRangePicker, type RangePickerOptions } from '@fex-design/core/date-picker/create-range-picker'
import { definedPickerOptions } from '@fex-design/core/date-picker/options'
import { readableCoreStore } from '@fex-design/svelte/stores/core-store'
import { fromStore } from 'svelte/store'

export type UseRangePickerOptions<TValue extends CalendarValue = CalendarValue> = RangePickerOptions<TValue>

export function useRangePicker<TValue extends CalendarValue = CalendarValue>(source: UseRangePickerOptions<TValue> | (() => UseRangePickerOptions<TValue>)) {
  const options = () => definedPickerOptions(typeof source === 'function' ? source() : source)
  const controller = createRangePicker<TValue>(options())
  const snapshot = fromStore(readableCoreStore(controller))
  // $props is an external source for core. The readable store owns subscription cleanup.
  $effect(() => controller.setOptions(options()))
  function state() { snapshot.current; return controller.getState() }
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
    getOpen: () => state().open,
    getPanel: () => state().panel,
    getViewDate: () => state().viewDate,
    getRangeValue: () => state().rangeValue,
    getActivePart: () => state().activePart,
    getHoverValue: () => state().hoverValue,
    getPreviewValue: () => state().previewValue,
    getStartText: () => state().startText,
    getEndText: () => state().endText,
    getDisplayRange: () => state().displayRange,
    getCanConfirm: () => state().canConfirm,
    getCommittedValue: () => state().committedValue,
    getPendingValue: () => state().pendingValue,
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
