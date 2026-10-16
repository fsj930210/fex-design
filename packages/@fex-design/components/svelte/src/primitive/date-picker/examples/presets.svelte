<script lang="ts">
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter } from '@fex-design/svelte/primitive/date-picker'
import { DatePickerPreset, type DatePickerSelectionValue } from '@fex-design/svelte/primitive/date-picker'
import { getCalendarToday, type CalendarRange } from '@fex-design/core/calendar'
let value = $state<DatePickerSelectionValue>(null)
let range = $state<CalendarRange>({})
let dateOpen = $state<boolean>(false)
let rangeOpen = $state<boolean>(false)
function chooseDate(days: number) {
  value = getCalendarToday().add({ days })
  dateOpen = false
}
function chooseRange(preset: 'week' | 'month') {
  const today = getCalendarToday()
  const start = preset === 'week' ? today.subtract({ days: 6 }) : today.with({ day: 1 })
  const end = preset === 'week' ? today : start.add({ months: 1 }).subtract({ days: 1 })
  range = { start, end }
  rangeOpen = false
}
</script>
<div class="flex w-full min-w-0 flex-col gap-4">
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">日期</p>
<DatePickerRoot value={value} open={dateOpen} onChange={next => value = next} onOpenChange={next => dateOpen = next}>
<DatePickerTrigger />
<DatePickerContent>
<div class="flex min-w-0 max-[480px]:flex-col">
<aside class="flex shrink-0 flex-col gap-1 border-e border-border p-2 max-[480px]:flex-row max-[480px]:flex-wrap max-[480px]:border-e-0 max-[480px]:border-b max-[480px]:[&_[data-slot=date-picker-preset]]:w-auto" aria-label="预设日期">
<DatePickerPreset onclick={() => chooseDate(-1)}>昨天</DatePickerPreset>
<DatePickerPreset onclick={() => chooseDate(7)}>下周</DatePickerPreset>
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
<RangePickerRoot value={range} open={rangeOpen} onChange={next => range = next} onOpenChange={next => rangeOpen = next}>
<RangePickerTrigger />
<RangePickerContent>
<div class="flex min-w-0 max-[480px]:flex-col">
<aside class="flex shrink-0 flex-col gap-1 border-e border-border p-2 max-[480px]:flex-row max-[480px]:flex-wrap max-[480px]:border-e-0 max-[480px]:border-b max-[480px]:[&_[data-slot=date-picker-preset]]:w-auto" aria-label="预设范围">
<DatePickerPreset onclick={() => chooseRange('week')}>最近 7 天</DatePickerPreset>
<DatePickerPreset onclick={() => chooseRange('month')}>本月</DatePickerPreset>
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
