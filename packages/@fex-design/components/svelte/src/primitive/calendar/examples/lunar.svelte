<script lang="ts">
  import {
    CalendarRoot,
    CalendarCellTrigger,
  } from "@fex-design/svelte/primitive/calendar";
  import {
    getCalendarUIOptions,
    type CalendarUIOptions,
  } from "@fex-design/core/calendar";
  import { calendarUIRootClassName } from "@fex-design/components-styles/calendar";
  import ExampleContent from "./_parts/content.svelte";
  import {
    calendarDemoDate,
    calendarDemoLunar,
  } from "@fex-design/docs-shared/calendar-demo-data";

  const options: CalendarUIOptions = { defaultViewDate: calendarDemoDate };
</script>

<CalendarRoot
  {...getCalendarUIOptions(options)}
  class={calendarUIRootClassName}
  data-fullscreen={true}
  ><ExampleContent {options}
    >{#snippet fullCellRender({ cell })}<CalendarCellTrigger
        {cell}
        class="flex-col items-center"
        ><span>{cell.label}</span><small>{calendarDemoLunar(cell)}</small
        ></CalendarCellTrigger
      >{/snippet}</ExampleContent
  ></CalendarRoot
>
