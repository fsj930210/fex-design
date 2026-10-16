<script setup lang="ts">
import { DatePicker, RangePicker } from '@fex-design/vue/ui/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'
defineOptions({ name: 'DatePickerDirectionExample' })
const date = createCalendarDate(2026, 10, 15)
  const range = { start: date, end: date.add({ days: 7 }) }
  const popupAppearance = {
    getPopupContainer: (reference: HTMLElement | null) => reference?.closest<HTMLElement>('[dir]') ?? document.body,
  }
</script>

<template>
<div class="flex w-full min-w-0 flex-col gap-6">
  <section class="flex w-full min-w-0 flex-col gap-2" dir="ltr">
    <p class="text-sm font-medium">LTR</p>
    <DatePicker :default-value="date" :popover-props="popupAppearance" />
    <RangePicker :default-value="range" :popover-props="popupAppearance" />
  </section>
  <section class="flex w-full min-w-0 flex-col gap-2" dir="rtl">
    <p class="text-sm font-medium">RTL</p>
    <DatePicker :default-value="date" :popover-props="popupAppearance" />
    <RangePicker :default-value="range" :popover-props="popupAppearance" />
  </section>
</div>
</template>
