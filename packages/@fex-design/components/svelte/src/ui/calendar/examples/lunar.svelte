<script lang="ts">
  import { Calendar } from "@fex-design/svelte/ui/calendar";
  import {
    calendarDemoDate,
    calendarDemoLunar,
  } from "@fex-design/docs-shared/calendar-demo-data";
  import { CalendarCellTrigger } from "@fex-design/svelte/primitive/calendar";
</script>

<Calendar defaultViewDate={calendarDemoDate}
  >{#snippet fullCellRender({ cell })}<CalendarCellTrigger
      {cell}
      class="flex-col items-center"
      ><span>{cell.label}</span><small>{calendarDemoLunar(cell)}</small
      ></CalendarCellTrigger
    >{/snippet}</Calendar
>
