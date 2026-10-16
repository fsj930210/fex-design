<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { analyzeTimeFormat } from '@fex-design/core/date/utils'
import type { TimeValue, TimePickerChangeDetails } from '@fex-design/core/time-picker/types'
import { TimePickerRoot, TimePickerTrigger, TimePickerPortal, TimePickerContent, TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn, TimePickerPeriodColumn } from '@fex-design/vue/primitive/time-picker'
import type { TimePickerProps } from './time-picker.types'
defineOptions({ name: 'TimePicker', inheritAttrs: false })
const props = withDefaults(defineProps<TimePickerProps>(), { open: undefined, allowClear: true })
const emit = defineEmits<{ 'update:value': [value: TimeValue | null]; change: [value: TimeValue | null, details: TimePickerChangeDetails]; 'update:open': [open: boolean]; openChange: [open: boolean] }>()
const attrs = useAttrs()
const columns = computed(() => analyzeTimeFormat(props.format ?? (props.use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss'), props.use12Hours).columns)
function change(value: TimeValue | null, details: TimePickerChangeDetails) { emit('update:value', value); emit('change', value, details) }
function openChange(open: boolean) { emit('update:open', open); emit('openChange', open) }
</script>
<template>
  <TimePickerRoot :popover-props="popoverProps" :value="value" :default-value="defaultValue" :format="format" :use12-hours="use12Hours" :disabled="disabled" :read-only="readOnly" :disabled-time="disabledTime" :open="open" :default-open="defaultOpen" @change="change" @open-change="openChange">
    <TimePickerTrigger v-bind="attrs" :size="size" :variant="variant" :input-props="inputProps" :allow-clear="allowClear" :placeholder="placeholder" :invalid="invalid">
      <template v-if="$slots.trigger" #default="binding"><slot name="trigger" v-bind="binding" /></template>
      <template v-if="$slots.prefix" #prefix><slot name="prefix" /></template>
      <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
    </TimePickerTrigger>
    <TimePickerPortal><TimePickerContent>
      <slot v-if="$slots.panel" name="panel" />
      <TimePickerPanel v-else><template v-for="column in columns" :key="column.unit">
        <TimePickerHourColumn v-if="column.unit === 'hour'" :step="step?.hour" />
        <TimePickerMinuteColumn v-else-if="column.unit === 'minute'" :step="step?.minute" />
        <TimePickerSecondColumn v-else-if="column.unit === 'second'" :step="step?.second" />
        <TimePickerPeriodColumn v-else />
      </template></TimePickerPanel>
      <slot name="footer" />
    </TimePickerContent></TimePickerPortal>
  </TimePickerRoot>
</template>
