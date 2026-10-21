<script setup lang="ts">
import type { TimePickerColumnCustomization } from './column-customization'
import {
  createHourOptions,
  getDisplayedHour,
  getDisplayedPeriod,
  resolveDisabledTime,
} from '@fex-design/core/time-picker/options'
import { computed, inject } from 'vue'
import { timePickerContextKey } from './context'
import TimePickerColumn from './time-picker-column.vue'
defineOptions({ name: 'TimePickerHourColumn' })
const props = defineProps<{
  columnProps?: TimePickerColumnCustomization | undefined
  step?: number | undefined
  disabled?: boolean | undefined
  isItemDisabled?: ((value: number) => boolean) | undefined
}>()
const context = inject(timePickerContextKey)
if (!context) throw new Error('TimePickerHourColumn must be used inside TimePickerRoot.')
const options = computed(() =>
  createHourOptions({
    step: props.step,
    use12Hours: context.use12Hours.value,
    period: context.snapshot.value.value ? getDisplayedPeriod(context.snapshot.value.value) : 'am',
    disabled: resolveDisabledTime(context.disabledTime.value, context.snapshot.value.value).hours,
  }).map((item) => ({
    ...item,
    disabled: item.disabled || Boolean(props.isItemDisabled?.(item.value)),
  })),
)
const selected = computed(() =>
  context.snapshot.value.value
    ? getDisplayedHour(context.snapshot.value.value, context.use12Hours.value)
    : undefined,
)
</script>
<template>
  <TimePickerColumn
    v-bind="columnProps"
    :options="options"
    :selected-value="selected"
    :disabled="disabled"
    @select="(value) => context.controller.selectHour(Number(value), context.use12Hours.value)"
  >
    <template v-if="$slots.item" #item="state"><slot name="item" v-bind="state" /></template>
  </TimePickerColumn>
</template>
