<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  import { calendarRowClassName } from "@fex-design/components-styles/calendar";
  import { cn } from "@fex-design/utils";
  import { useCalendarContext } from "./context";
  type Props = HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement | null };
  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: Props = $props();
  const context = useCalendarContext("CalendarRow");
</script>

<div
  {...rest}
  bind:this={ref}
  data-slot="calendar-row"
  role="row"
  data-panel={context.getState().panel}
  class={cn(calendarRowClassName, className)}
>
  {@render children?.()}
</div>
