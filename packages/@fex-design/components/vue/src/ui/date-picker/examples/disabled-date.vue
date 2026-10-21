<script setup lang="ts">
import { DatePicker, RangePicker } from '@fex-design/vue/ui/date-picker'
import type { CalendarDate } from '@fex-design/core/calendar'
defineOptions({ name: 'DatePickerDisabledDateExample' })
const disabledWeekend = (date: CalendarDate) => date.dayOfWeek > 5
</script>
<template>
  <div class="flex w-full min-w-0 flex-col gap-4">
    <section class="flex w-full min-w-0 flex-col gap-2">
      <p class="text-sm font-medium">工作日</p>
      <DatePicker :disabled-date="disabledWeekend" />
      <RangePicker :disabled-date="disabledWeekend" />
    </section>
  </div>
</template>
