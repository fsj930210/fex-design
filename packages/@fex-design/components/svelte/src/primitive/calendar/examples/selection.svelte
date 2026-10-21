<script lang="ts">
  import { CalendarRoot } from "@fex-design/svelte/primitive/calendar";
  import {
    getCalendarUIOptions,
    type CalendarUIOptions,
  } from "@fex-design/core/calendar";
  import { calendarUIRootClassName } from "@fex-design/components-styles/calendar";
  import ExampleContent from "./_parts/content.svelte";
  import { calendarDemoDate } from "@fex-design/docs-shared/calendar-demo-data";
  import type { CalendarDate } from "@fex-design/core/calendar";
  let value = $state<CalendarDate | null>(null);
  const options: CalendarUIOptions = $derived({
    defaultViewDate: calendarDemoDate,
    value,
  });
</script>

<p>选中：{value?.toString() ?? "未选择"}</p>
<CalendarRoot
  {...getCalendarUIOptions(options)}
  class={calendarUIRootClassName}
  data-fullscreen={true}
  onChange={(next) => (value = next)}><ExampleContent {options} /></CalendarRoot
>
