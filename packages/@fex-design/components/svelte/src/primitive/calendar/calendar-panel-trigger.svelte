<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { CalendarPanel } from "@fex-design/core/calendar";
  import { calendarPanelTriggerClassName } from "@fex-design/components-styles/calendar";
  import { cn } from "@fex-design/utils";
  import { useCalendarContext } from "./context";
  let {
    panel,
    children,
    class: className,
    onclick,
    ref = $bindable(null),
    ...rest
  }: HTMLButtonAttributes & {
    panel: CalendarPanel;
    ref?: HTMLButtonElement | null;
  } = $props();
  const context = useCalendarContext();
</script>

<button
  {...rest}
  bind:this={ref}
  type="button"
  data-slot="calendar-panel-trigger"
  data-panel={panel}
  class={cn(calendarPanelTriggerClassName, className)}
  onclick={(event) => {
    onclick?.(event);
    if (!event.defaultPrevented) context.controller.setPanel(panel);
  }}>{@render children?.()}</button
>
