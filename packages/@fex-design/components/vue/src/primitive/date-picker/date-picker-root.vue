<script setup lang="ts">
import { pickerAppearanceKey } from './appearance-context'
import type { PickerAppearance } from './appearance.types'
import { pickerOwnerKey } from './owner-context'
import { pickerContainerKey } from './container-context'
import type { CalendarDate, CalendarValue, CalendarWeekday } from '@fex-design/core/calendar'
import type { DatePickerPicker, DatePickerDisabledDateInfo } from '@fex-design/core/date-picker/types'
import { definedPickerOptions, getDatePickerPopoverOptions } from '@fex-design/core/date-picker/options'
import { popoverKey } from '../popover/context'
import { inject, provide, useAttrs, useSlots } from 'vue'
import PopoverRoot from '../popover/popover-root.vue'
import { datePickerContextKey, type DatePickerSelectionValue } from './context'
import { useDatePicker } from './use-date-picker'

defineOptions({ name: 'DatePickerRoot', inheritAttrs: false })
const props = withDefaults(defineProps<Omit<PickerAppearance, 'startInputProps' | 'endInputProps'> & {
    popoverProps?: PickerAppearance['popoverProps']
    value?: DatePickerSelectionValue | undefined
    defaultValue?: DatePickerSelectionValue | undefined
    open?: boolean | undefined
    defaultOpen?: boolean | undefined
    picker?: DatePickerPicker | undefined
    multiple?: boolean | undefined
    maxCount?: number | undefined
    needConfirm?: boolean | undefined
    disabled?: boolean | undefined
    clearable?: boolean | undefined
    format?: string | undefined
    weekStartsOn?: CalendarWeekday | undefined
    minDate?: CalendarDate | undefined
    maxDate?: CalendarDate | undefined
    disabledDate?: ((date: CalendarDate, info: DatePickerDisabledDateInfo) => boolean) | undefined
  }>(), { open: undefined, defaultOpen: undefined, multiple: undefined, needConfirm: undefined, disabled: undefined, clearable: undefined })

const emit = defineEmits<{
  change: [value: DatePickerSelectionValue]
  'update:value': [value: DatePickerSelectionValue]
  openChange: [open: boolean]
  'update:open': [open: boolean]
}>()
const attrs = useAttrs()
const slots = useSlots()
// A tiny functional component reuses the default slot inside a replacement container.
const content = () => slots.default?.({ state: picker })
function popupOptions() { return getDatePickerPopoverOptions({ ...attrs, ...props.popoverProps }) }
const onChange = (value: DatePickerSelectionValue) => { emit('update:value', value); emit('change', value) }
const onOpenChange = (open: boolean) => { emit('update:open', open); emit('openChange', open) }
const picker = useDatePicker<CalendarValue>(() => {
  const { popoverProps, inputProps, calendarProps, classNames, styles, ...options } = props
  return { ...definedPickerOptions(options), onChange, onOpenChange }
})
provide(pickerAppearanceKey, () => props)
provide(pickerOwnerKey, picker)
provide(pickerContainerKey, { parentPopover: inject(popoverKey, null) })
provide(datePickerContextKey, picker)
defineExpose({ controller: picker.controller })
</script>

<template>
  <slot v-if="slots.container" name="container" :state="picker" :content="content" />
  <template v-else>
    <PopoverRoot v-bind="popupOptions()" :open="picker.open.value" @open-change="picker.setOpen">
      <slot :state="picker" />
    </PopoverRoot>
  </template>
</template>
