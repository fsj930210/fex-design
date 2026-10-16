<script setup lang="ts">
import { RangePicker } from '@fex-design/vue/ui/date-picker'
import type { CalendarDate } from '@fex-design/core/calendar'
import type { DatePickerDisabledDateInfo } from '@fex-design/core/date-picker/types'
import { getCalendarValueDate } from '@fex-design/core/calendar/value'
defineOptions({ name: 'DatePickerRangeLimitExample' })
const limitDays = (date: CalendarDate, info: DatePickerDisabledDateInfo) => {
    const from = info.from ? getCalendarValueDate(info.from) : null
    return Boolean(from && (date.toString() < from.subtract({ days: 6 }).toString() || date.toString() > from.add({ days: 6 }).toString()))
  }
const limitMonths = (date: CalendarDate, info: DatePickerDisabledDateInfo) => {
    const from = info.from ? getCalendarValueDate(info.from) : null
    return Boolean(from && Math.abs((date.year - from.year) * 12 + date.month - from.month) > 5)
  }
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">最多 7 天</p>
<RangePicker :disabled-date="limitDays" />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">最多 6 个月</p>
<RangePicker :picker="'month'" :disabled-date="limitMonths" />
</section>
</div>
</template>
