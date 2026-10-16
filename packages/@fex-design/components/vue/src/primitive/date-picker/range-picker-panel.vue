<script setup lang="ts">
import { useAttrs } from 'vue'
import type { CalendarDate } from '@fex-design/core/calendar'
import DatePickerPanel from './date-picker-panel.vue'

defineOptions({ name: 'RangePickerPanel', inheritAttrs: false })
const attrs = useAttrs()
defineProps<{ class?: string | undefined; panelViewDate?: CalendarDate | undefined }>()
</script>

<template>
  <DatePickerPanel v-bind="attrs" v-if="$slots.default" range :class="class" :panel-view-date="panelViewDate">
    <slot />
  </DatePickerPanel>
  <DatePickerPanel v-bind="attrs" v-else range :class="class" :panel-view-date="panelViewDate" />
</template>
