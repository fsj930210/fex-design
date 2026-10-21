<script lang="ts">
  import { DatePicker, RangePicker } from "@fex-design/svelte/ui/date-picker";
  import { createCalendarDate } from "@fex-design/core/calendar/temporal";
  const min = createCalendarDate(2026, 10, 1);
  const max = createCalendarDate(2026, 12, 31);
</script>

<div class="flex w-full min-w-0 flex-col gap-4">
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">2026-10-01 至 2026-12-31</p>
    <DatePicker minDate={min} maxDate={max} />
    <RangePicker minDate={min} maxDate={max} />
  </section>
</div>
