<script setup lang="ts">
import { DatePicker, RangePicker } from '@fex-design/vue/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'
defineOptions({ name: 'DatePickerDisabledExample' })
const date = createCalendarDate(2026, 10, 15)
const range = { start: date, end: date.add({ days: 7 }) }
</script>
<template>
  <div class="flex w-full min-w-0 flex-col gap-4">
    <section class="flex w-full min-w-0 flex-col gap-2">
      <p class="text-sm font-medium">禁用</p>
      <DatePicker :disabled="true" :default-value="date" />
      <RangePicker :disabled="true" :default-value="range" />
    </section>
    <section class="flex w-full min-w-0 flex-col gap-2">
      <p class="text-sm font-medium">默认（只读输入，可选择）</p>
      <DatePicker :default-value="date" />
      <RangePicker :default-value="range" />
    </section>
  </div>
</template>
