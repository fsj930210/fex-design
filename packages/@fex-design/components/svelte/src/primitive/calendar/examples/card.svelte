<script lang="ts">
  import { CalendarRoot } from "@fex-design/svelte/primitive/calendar";
  import {
    getCalendarUIOptions,
    type CalendarUIOptions,
  } from "@fex-design/core/calendar";
  import { calendarUIRootClassName } from "@fex-design/components-styles/calendar";
  import ExampleContent from "./_parts/content.svelte";
  import { calendarDemoDate } from "@fex-design/docs-shared/calendar-demo-data";
  const options: CalendarUIOptions = {
    defaultViewDate: calendarDemoDate,
    fullscreen: false,
  };
</script>

<div class="max-w-sm">
  <CalendarRoot
    {...getCalendarUIOptions(options)}
    class={calendarUIRootClassName}
    data-fullscreen={false}><ExampleContent {options} /></CalendarRoot
  >
</div>
