<script setup lang="ts">
import { computed, provide } from 'vue'
import type { DisabledTime, TimePickerPopoverOptions } from '@fex-design/core/time-picker/types'
import type {
  TimeRangeValue,
  TimeRangeChangeDetails,
} from '@fex-design/core/time-picker/range-types'
import TimePickerRoot from './time-picker-root.vue'
import { useTimeRangePicker } from './use-time-range-picker'
import { timeRangePickerContextKey } from './time-range-picker-context'
defineOptions({ name: 'TimeRangePickerRoot' })
const props = withDefaults(
  defineProps<{
    value?: TimeRangeValue | null
    defaultValue?: TimeRangeValue | null
    open?: boolean
    defaultOpen?: boolean
    needConfirm?: boolean
    format?: string
    use12Hours?: boolean
    disabled?: boolean
    readOnly?: boolean
    disabledTime?: DisabledTime
    popoverProps?: TimePickerPopoverOptions
  }>(),
  { open: undefined, needConfirm: true, use12Hours: false, disabled: false, readOnly: false },
)
const emit = defineEmits<{
  change: [value: TimeRangeValue | null, details: TimeRangeChangeDetails]
  openChange: [open: boolean]
}>()
const range = useTimeRangePicker(() => ({
  ...props,
  onChange: (value, details) => emit('change', value, details),
  onOpenChange: (open) => emit('openChange', open),
}))
const { controller, snapshot } = range
provide(timeRangePickerContextKey, { ...range, options: computed(() => props) })
</script>
<template>
  <TimePickerRoot
    :value="snapshot.draft[snapshot.activePart === 'start' ? 0 : 1]"
    :open="snapshot.open"
    :format="format"
    :use12-hours="use12Hours"
    :disabled="disabled"
    :read-only="readOnly"
    :disabled-time="disabledTime"
    :popover-props="popoverProps"
    @change="(value, details) => controller.select(value, details.reason)"
    @open-change="controller.setOpen"
  >
    <slot :controller="controller" :snapshot="snapshot" />
  </TimePickerRoot>
</template>
