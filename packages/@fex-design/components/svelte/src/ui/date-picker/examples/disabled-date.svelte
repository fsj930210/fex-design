<script lang="ts">
  import { DatePicker, RangePicker } from "@fex-design/svelte/ui/date-picker";
  import type { CalendarDate } from "@fex-design/core/calendar";
  const disabledWeekend = (date: CalendarDate) => date.dayOfWeek > 5;
</script>

<div class="flex w-full min-w-0 flex-col gap-4">
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">工作日</p>
    <DatePicker disabledDate={disabledWeekend} />
    <RangePicker disabledDate={disabledWeekend} />
  </section>
</div>
