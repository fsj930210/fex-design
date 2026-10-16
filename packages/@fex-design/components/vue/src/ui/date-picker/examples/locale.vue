<script setup lang="ts">
import { DatePicker, RangePicker } from '@fex-design/vue/ui/date-picker'
defineOptions({ name: 'DatePickerLocaleExample' })
const english = { weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], year: 'Year', yearSuffix: '', month: 'Month', datePanel: 'Date', monthPanel: 'Month', previous: 'Previous', next: 'Next', today: 'Today', week: 'Week' }
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">中文</p>
<DatePicker  />
<RangePicker  />
</section>
<section class="flex w-full min-w-0 flex-col gap-2" lang="en">
<p class="text-sm font-medium">English · Monday first</p>
<DatePicker :calendar-props="{ locale: english }" :week-starts-on="1" :input-props="{ placeholder: 'Select date', 'aria-label': 'Select date' }" />
<RangePicker :calendar-props="{ locale: english }" :week-starts-on="1" :start-input-props="{ placeholder: 'Start date', 'aria-label': 'Start date' }" :end-input-props="{ placeholder: 'End date', 'aria-label': 'End date' }" />
</section>
</div>
</template>
