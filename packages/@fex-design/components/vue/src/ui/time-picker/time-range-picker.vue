<script setup lang="ts">
import { computed } from 'vue'
import { analyzeTimeFormat } from '@fex-design/core/date/utils'
import type {
  TimeRangeValue,
  TimeRangeChangeDetails,
} from '@fex-design/core/time-picker/range-types'
import {
  TimeRangePickerRoot,
  TimeRangePickerTrigger,
  TimeRangePickerFooter,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
} from '@fex-design/vue/primitive/time-picker'
import type { TimeRangePickerProps } from './time-range-picker.types'
defineOptions({ name: 'TimeRangePicker', inheritAttrs: false })
const props = withDefaults(defineProps<TimeRangePickerProps>(), {
  open: undefined,
  needConfirm: true,
  use12Hours: false,
  disabled: false,
  readOnly: false,
})
const emit = defineEmits<{
  change: [value: TimeRangeValue | null, details: TimeRangeChangeDetails]
  'update:value': [value: TimeRangeValue | null]
  openChange: [open: boolean]
  'update:open': [open: boolean]
}>()
const columns = computed(
  () =>
    analyzeTimeFormat(
      props.format ?? (props.use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss'),
      props.use12Hours,
    ).columns,
)
function change(value: TimeRangeValue | null, details: TimeRangeChangeDetails) {
  emit('update:value', value)
  emit('change', value, details)
}
function openChange(open: boolean) {
  emit('update:open', open)
  emit('openChange', open)
}
</script>
<template>
  <TimeRangePickerRoot
    :value="value"
    :default-value="defaultValue"
    :open="open"
    :default-open="defaultOpen"
    :need-confirm="needConfirm"
    :format="format"
    :use12-hours="use12Hours"
    :disabled="disabled"
    :read-only="readOnly"
    :disabled-time="disabledTime"
    :popover-props="popoverProps"
    @change="change"
    @open-change="openChange"
  >
    <TimeRangePickerTrigger
      :class="props.class"
      :style="props.style"
      :dir="dir"
      :size="size"
      :variant="variant"
      :placeholder="placeholder"
      :allow-clear="allowClear"
      :start-input-props="startInputProps"
      :end-input-props="endInputProps"
    >
      <template v-if="$slots.prefix" #prefix><slot name="prefix" /></template>
      <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
    </TimeRangePickerTrigger>
    <TimePickerPortal
      ><TimePickerContent v-bind="contentProps"
        ><TimePickerPanel v-bind="panelProps">
          <template v-for="column in columns" :key="column.unit">
            <TimePickerHourColumn
              v-bind="hourColumnProps"
              v-if="column.unit === 'hour'"
              :step="step?.hour"
            />
            <TimePickerMinuteColumn
              v-bind="minuteColumnProps"
              v-else-if="column.unit === 'minute'"
              :step="step?.minute"
            />
            <TimePickerSecondColumn
              v-bind="secondColumnProps"
              v-else-if="column.unit === 'second'"
              :step="step?.second"
            />
            <TimePickerPeriodColumn v-bind="periodColumnProps" v-else />
          </template> </TimePickerPanel
        ><TimeRangePickerFooter v-bind="footerProps" /></TimePickerContent
    ></TimePickerPortal>
  </TimeRangePickerRoot>
</template>
