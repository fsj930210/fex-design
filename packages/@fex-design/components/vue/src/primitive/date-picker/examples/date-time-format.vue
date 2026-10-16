<script setup lang="ts">
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter, createDatePickerDateTime } from '@fex-design/vue/primitive/date-picker'
defineOptions({ name: 'DatePickerDateTimeFormatExample' })
const initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0)
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-6">
<section class="flex w-full min-w-0 flex-col gap-2"><p class="text-sm font-medium">YYYY-MM-DD HH:mm</p>
<DatePickerRoot format="YYYY-MM-DD HH:mm" :show-time="true" :default-value="initial">
      <DatePickerTrigger />
      <DatePickerContent><DatePickerPanel /><DatePickerFooter /></DatePickerContent>
    </DatePickerRoot>
</section>
<section class="flex w-full min-w-0 flex-col gap-2"><p class="text-sm font-medium">YYYY-MM-DD HH:mm:ss</p>
<DatePickerRoot format="YYYY-MM-DD HH:mm:ss" :show-time="true" :default-value="initial">
      <DatePickerTrigger />
      <DatePickerContent><DatePickerPanel /><DatePickerFooter /></DatePickerContent>
    </DatePickerRoot>
</section>
<section class="flex w-full min-w-0 flex-col gap-2"><p class="text-sm font-medium">YYYY-MM-DD hh:mm A</p>
<DatePickerRoot format="YYYY-MM-DD hh:mm A" :show-time="{ use12Hours: true, step: { minute: 5 } }" :default-value="initial">
      <DatePickerTrigger />
      <DatePickerContent><DatePickerPanel /><DatePickerFooter /></DatePickerContent>
    </DatePickerRoot>
</section>
<section class="flex w-full min-w-0 flex-col gap-2"><p class="text-sm font-medium">选择日期时默认使用 08:30</p>
<DatePickerRoot format="YYYY-MM-DD HH:mm" :show-time="{ format: 'HH:mm', defaultOpenValue: { hour: 8, minute: 30, second: 0 } }" >
      <DatePickerTrigger />
      <DatePickerContent><DatePickerPanel /><DatePickerFooter /></DatePickerContent>
    </DatePickerRoot>
</section>
</div>
</template>
