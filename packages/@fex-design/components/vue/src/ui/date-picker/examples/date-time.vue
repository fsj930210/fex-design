<script setup lang="ts">
import { DatePicker, RangePicker, createDatePickerDateTime } from '@fex-design/vue/ui/date-picker'
defineOptions({ name: 'DatePickerDateTimeExample' })
const initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0)
const end = createDatePickerDateTime(2026, 10, 15, 17, 45, 0)
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-6">
<section class="flex w-full min-w-0 flex-col gap-2"><p class="text-sm font-medium">日期时间：确认后提交</p>
<DatePicker :show-time="true" :default-value="initial"  />
</section>
<section class="flex w-full min-w-0 flex-col gap-2"><p class="text-sm font-medium">日期时间范围：分别确认开始和结束</p>
<RangePicker :show-time="true" :default-value="{ start: initial, end }"  />
</section>
</div>
</template>
