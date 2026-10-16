<script setup lang="ts">
import { DatePicker, RangePicker } from '@fex-design/vue/ui/date-picker'
defineOptions({ name: 'DatePickerPickerExample' })

</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">日期</p>
<DatePicker :picker="'date'" />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">周</p>
<DatePicker :picker="'week'" />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">月份</p>
<DatePicker :picker="'month'" />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">季度</p>
<DatePicker :picker="'quarter'" />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">年份</p>
<DatePicker :picker="'year'" />
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">月份范围</p>
<RangePicker :picker="'month'" />
</section>
</div>
</template>
