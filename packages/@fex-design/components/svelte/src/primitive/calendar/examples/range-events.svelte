<script lang="ts">
  import { CalendarRoot } from "@fex-design/svelte/primitive/calendar";
  import {
    getCalendarUIOptions,
    type CalendarUIOptions,
  } from "@fex-design/core/calendar";
  import { calendarUIRootClassName } from "@fex-design/components-styles/calendar";
  import ExampleContent from "./_parts/content.svelte";
  import {
    calendarDemoDate,
    calendarDemoEvent,
  } from "@fex-design/docs-shared/calendar-demo-data";
  const options: CalendarUIOptions = { defaultViewDate: calendarDemoDate };
</script>

<CalendarRoot
  {...getCalendarUIOptions(options)}
  class={calendarUIRootClassName}
  data-fullscreen={true}
>
  <ExampleContent
    {options}
    classNames={{ cell: "px-0", cellContent: "overflow-visible" }}
  >
    {#snippet cellRender({ cell })}
      {@const event = calendarDemoEvent(cell)}
      {#if event}
        <div
          class="bg-primary text-primary-foreground px-2"
          data-segment={event.segment}
        >
          {event.label}
        </div>
      {/if}
    {/snippet}
  </ExampleContent>
</CalendarRoot>
