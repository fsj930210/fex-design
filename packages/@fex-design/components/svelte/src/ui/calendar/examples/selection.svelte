<script lang="ts">
  import { Calendar } from "@fex-design/svelte/ui/calendar";
  import { calendarDemoDate } from "@fex-design/docs-shared/calendar-demo-data";
  import type { CalendarDate } from "@fex-design/core/calendar";
  let value = $state<CalendarDate | null>(null);
</script>

<p>选中：{value?.toString() ?? "未选择"}</p>
<Calendar
  defaultViewDate={calendarDemoDate}
  {value}
  onChange={(next) => (value = next)}
/>
