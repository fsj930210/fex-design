<script lang="ts" generics="TValue extends CalendarValue = CalendarValue">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import {
    focusCalendarCell,
    type CalendarCell,
    type CalendarValue,
  } from "@fex-design/core/calendar";
  import { calendarCellTriggerClassName } from "@fex-design/components-styles/calendar";
  import { cn } from "@fex-design/utils";
  import { useCalendarContext } from "./context";
  type Props = Omit<HTMLButtonAttributes, "children"> & {
    cell: CalendarCell<TValue>;
    children?: Snippet<[CalendarCell<TValue>]>;
    ref?: HTMLButtonElement | null;
  };
  let {
    cell,
    children,
    class: className,
    onclick,
    onkeydown,
    onfocus,
    disabled,
    ref = $bindable(null),
    ...rest
  }: Props = $props();
  const context = useCalendarContext("CalendarCellTrigger");
  const tabIndex = $derived.by(() => {
    context.getState();
    return context.controller.getCellTabIndex(cell);
  });
</script>

<button
  {...rest}
  bind:this={ref}
  type="button"
  data-slot="calendar-cell-trigger"
  data-key={cell.key}
  tabindex={tabIndex}
  onfocus={(event) => {
    onfocus?.(event);
    if (!event.defaultPrevented) context.controller.focusCell(cell);
  }}
  onkeydown={(event) => {
    onkeydown?.(event);
    if (event.defaultPrevented) return;
    const target = context.controller.moveFocus(cell, event.key);
    if (target) {
      event.preventDefault();
      focusCalendarCell(event.currentTarget, target.key);
    }
  }}
  aria-label={rest["aria-label"] ?? cell.date.toString()}
  aria-pressed={cell.state.selected}
  disabled={disabled || cell.state.disabled}
  class={cn(
    calendarCellTriggerClassName,
    cell.state.today && "focus-visible:ring-0",
    className,
  )}
  onclick={(event) => {
    onclick?.(event);
    if (!event.defaultPrevented) context.controller.selectCell(cell);
  }}
  >{#if children}{@render children(cell)}{:else}{cell.label}{/if}</button
>
