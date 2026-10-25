<script lang="ts">
  import { RangePicker } from "@fex-design/svelte/ui/date-picker";

  import { getCalendarToday } from "@fex-design/core/calendar";
  const today = getCalendarToday();
</script>

<div class="flex flex-wrap items-start gap-4">
  <RangePicker defaultValue={{ start: today, end: today.add({ days: 7 }) }}
  ></RangePicker>
</div>
