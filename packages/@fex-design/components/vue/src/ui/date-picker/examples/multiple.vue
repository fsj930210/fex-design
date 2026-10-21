<script setup lang="ts">
import { DatePicker } from '@fex-design/vue/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'
defineOptions({ name: 'DatePickerMultipleExample' })
const values = [5, 6, 7, 12, 13, 19, 26].map((day) => createCalendarDate(2026, 10, day))
</script>
<template>
  <div class="flex w-full min-w-0 flex-col items-stretch gap-4">
    <div class="flex w-full min-w-0 flex-col gap-2">
      <span class="text-sm text-muted-foreground">默认换行</span>
      <DatePicker :multiple="true" :default-value="values" class="w-full" />
    </div>
    <div class="flex w-full min-w-0 flex-col gap-2">
      <span class="text-sm text-muted-foreground">最多显示 2 个标签</span>
      <DatePicker :multiple="true" :default-value="values" :max-count="2" class="w-full" />
    </div>
  </div>
</template>
