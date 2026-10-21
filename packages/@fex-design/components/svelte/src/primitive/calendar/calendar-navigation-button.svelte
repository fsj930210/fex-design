<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { CalendarNavigationAction } from "@fex-design/core/calendar";
  import { calendarNavigationButtonClassName } from "@fex-design/components-styles/calendar";
  import { cn } from "@fex-design/utils";
  import { useCalendarContext } from "./context";
  import ChevronLeftIcon from "../../icons/chevron-left.svelte";
  import ChevronRightIcon from "../../icons/chevron-right.svelte";
  let {
    action,
    children,
    class: className,
    onclick,
    ref = $bindable(null),
    ...rest
  }: HTMLButtonAttributes & {
    action: CalendarNavigationAction;
    ref?: HTMLButtonElement | null;
  } = $props();
  const context = useCalendarContext();
</script>

<button
  {...rest}
  bind:this={ref}
  type="button"
  data-slot="calendar-navigation-button"
  data-action={action}
  class={cn(calendarNavigationButtonClassName, className)}
  onclick={(event) => {
    onclick?.(event);
    if (!event.defaultPrevented) context.controller.navigate(action);
  }}
  >{#if children}{@render children?.()}{:else if action.startsWith("previous")}<ChevronLeftIcon
      class="size-4 rtl:rotate-180"
    />{:else if action.startsWith("next")}<ChevronRightIcon
      class="size-4 rtl:rotate-180"
    />{/if}</button
>
