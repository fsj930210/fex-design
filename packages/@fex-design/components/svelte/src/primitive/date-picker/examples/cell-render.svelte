<script lang="ts">
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter } from '@fex-design/svelte/primitive/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'
import type { CalendarCellRenderContext } from '@fex-design/core/calendar'
const date = createCalendarDate(2026, 10, 15)
</script>
{#snippet customCell({ cell }: CalendarCellRenderContext)}
{#if cell.panel === 'date' && cell.date.day === 15}<span class="pointer-events-none absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary"></span>{/if}
{/snippet}
<div class="flex w-full min-w-0 flex-col gap-4">
<section class="flex w-full min-w-0 flex-col gap-2">
<p class="text-sm font-medium">每月 15 日</p>
<DatePickerRoot defaultValue={date} calendarProps={{ cellRender: customCell, classNames: { cellContent: 'pointer-events-none' } }}>
<DatePickerTrigger />
<DatePickerContent>
<DatePickerPanel />
<DatePickerFooter></DatePickerFooter>
</DatePickerContent>
</DatePickerRoot>
<RangePickerRoot defaultValue={{ start: date, end: date.add({ days: 7 }) }} calendarProps={{ cellRender: customCell, classNames: { cellContent: 'pointer-events-none' } }}>
<RangePickerTrigger />
<RangePickerContent>
<RangePickerPanelGroup />
<DatePickerFooter></DatePickerFooter>
</RangePickerContent>
</RangePickerRoot>
</section>
</div>
