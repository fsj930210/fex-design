<script lang="ts" generics="TValue extends CalendarValue = CalendarValue">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import {
    getCalendarCellAttributes,
    type CalendarCell,
    type CalendarValue,
  } from "@fex-design/core/calendar";
  import {
    calendarCellContainerClassName,
    calendarCellClassName,
    calendarWeekRangeCellClassName,
  } from "@fex-design/components-styles/calendar";
  import { cn } from "@fex-design/utils";
  import { useCalendarContext } from "./context";
  import CalendarCellTrigger from "./calendar-cell-trigger.svelte";
  type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    cell: CalendarCell<TValue>;
    children?: Snippet<[CalendarCell<TValue>]>;
    ref?: HTMLDivElement | null;
  };
  let {
    cell,
    children,
    class: className,
    onmouseenter,
    ref = $bindable(null),
    ...rest
  }: Props = $props();
  const context = useCalendarContext("CalendarCell");
</script>

<div
  {...rest}
  {...getCalendarCellAttributes(
    cell,
    context.getState().hoveredRowIndex,
    context.getState().hasRange,
  )}
  bind:this={ref}
  role="gridcell"
  aria-selected={cell.state.selected}
  aria-disabled={cell.state.disabled}
  data-slot="calendar-cell"
  class={cn(
    calendarCellContainerClassName,
    calendarCellClassName,
    cell.granularity === "week" && calendarWeekRangeCellClassName,
    className,
  )}
  onmouseenter={(event) => {
    onmouseenter?.(event);
    if (!event.defaultPrevented) context.controller.hoverCell(cell);
  }}
>
  {#if children}{@render children(cell)}{:else}<CalendarCellTrigger
      {cell}
    />{/if}
</div>
