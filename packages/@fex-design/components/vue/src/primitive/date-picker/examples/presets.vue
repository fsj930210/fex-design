<script setup lang="ts">
import { ref } from 'vue'
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter } from '@fex-design/vue/primitive/date-picker'
import { DatePickerPreset, type DatePickerSelectionValue } from '@fex-design/vue/primitive/date-picker'
import { getCalendarToday, type CalendarRange } from '@fex-design/core/calendar'
defineOptions({ name: 'DatePickerPresetsExample' })
const value = ref<DatePickerSelectionValue>(null)
const range = ref<CalendarRange>({})
const dateOpen = ref<boolean>(false)
const rangeOpen = ref<boolean>(false)
function chooseDate(days: number) {
  value.value = getCalendarToday().add({ days })
  dateOpen.value = false
}
function chooseRange(preset: 'week' | 'month') {
  const today = getCalendarToday()
  const start = preset === 'week' ? today.subtract({ days: 6 }) : today.with({ day: 1 })
  const end = preset === 'week' ? today : start.add({ months: 1 }).subtract({ days: 1 })
  range.value = { start, end }
  rangeOpen.value = false
}
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">日期</p>
<DatePickerRoot  v-model:value="value" v-model:open="dateOpen">
<DatePickerTrigger />
<DatePickerContent>
<div class="flex min-w-0 max-[480px]:flex-col">
<aside class="flex shrink-0 flex-col gap-1 border-e border-border p-2 max-[480px]:flex-row max-[480px]:flex-wrap max-[480px]:border-e-0 max-[480px]:border-b max-[480px]:[&_[data-slot=date-picker-preset]]:w-auto" aria-label="预设日期">
<DatePickerPreset @click="chooseDate(-1)">昨天</DatePickerPreset>
<DatePickerPreset @click="chooseDate(7)">下周</DatePickerPreset>
</aside>
<div class="min-w-0 flex-1">
<DatePickerPanel />
<DatePickerFooter />
</div>
</div>
</DatePickerContent>
</DatePickerRoot>
</section>
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">范围</p>
<RangePickerRoot  v-model:value="range" v-model:open="rangeOpen">
<RangePickerTrigger />
<RangePickerContent>
<div class="flex min-w-0 max-[480px]:flex-col">
<aside class="flex shrink-0 flex-col gap-1 border-e border-border p-2 max-[480px]:flex-row max-[480px]:flex-wrap max-[480px]:border-e-0 max-[480px]:border-b max-[480px]:[&_[data-slot=date-picker-preset]]:w-auto" aria-label="预设范围">
<DatePickerPreset @click="chooseRange('week')">最近 7 天</DatePickerPreset>
<DatePickerPreset @click="chooseRange('month')">本月</DatePickerPreset>
</aside>
<div class="min-w-0 flex-1">
<RangePickerPanelGroup />
<DatePickerFooter />
</div>
</div>
</RangePickerContent>
</RangePickerRoot>
</section>
</div>
</template>
