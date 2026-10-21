<script setup lang="ts">
import { h } from 'vue'
import { DatePicker, RangePicker } from '@fex-design/vue/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'
import type { CalendarCellRenderContext } from '@fex-design/core/calendar'
defineOptions({ name: 'DatePickerCellRenderExample' })
const date = createCalendarDate(2026, 10, 15)
const customCell = ({ cell }: CalendarCellRenderContext) =>
  cell.panel === 'date' && cell.date.day === 15
    ? h('span', {
        class:
          'pointer-events-none absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary',
      })
    : null
</script>
<template>
  <div class="flex w-full min-w-0 flex-col gap-4">
    <section class="flex w-full min-w-0 flex-col gap-2">
      <p class="text-sm font-medium">每月 15 日</p>
      <DatePicker
        :default-value="date"
        :calendar-props="{
          cellRender: customCell,
          classNames: { cellContent: 'pointer-events-none' },
        }"
      />
      <RangePicker
        :default-value="{ start: date, end: date.add({ days: 7 }) }"
        :calendar-props="{
          cellRender: customCell,
          classNames: { cellContent: 'pointer-events-none' },
        }"
      />
    </section>
  </div>
</template>
