<script lang="ts">
import { getDatePickerHeaderActionLabel } from '@fex-design/core/date-picker/panel'
  import { isPickerActionBlocked } from '@fex-design/core/date-picker/view';

  import type { DatePickerHeaderAction } from "@fex-design/core/date-picker/types";
  import { datePickerHeaderNavigationClassName } from "@fex-design/components-styles/date-picker";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { getContext } from "svelte";
  import ChevronLeftIcon from '@fex-design/svelte/icons/chevron-left.svelte';
  import ChevronRightIcon from '@fex-design/svelte/icons/chevron-right.svelte';
  import ChevronsLeftIcon from '@fex-design/svelte/icons/chevrons-left.svelte';
  import ChevronsRightIcon from '@fex-design/svelte/icons/chevrons-right.svelte';
  import { Button } from "@fex-design/svelte/primitive/button";
  import { calendarContextKey, type CalendarContextValue } from "../calendar/context";

  interface Props extends Omit<HTMLButtonAttributes, "children" | "type"> {
    action: DatePickerHeaderAction;
    children?: Snippet;
  }
  let {
    action,
    class: className,
    children,
    onclick,
    ...rest
  }: Props = $props();
  const calendar = getContext<CalendarContextValue>(calendarContextKey);
  const isPrevious = $derived(action.startsWith("previous"));
  const isDouble = $derived(
    action.includes("year") || action.includes("panel"),
  );

  function runAction(event: MouseEvent) {
    onclick?.(event as Parameters<NonNullable<typeof onclick>>[0]);
    if (isPickerActionBlocked(event)) return;
    calendar.controller.navigate(action);
  }
</script>

<Button
  {...rest}
  type="button"
  data-slot="date-picker-header-button"
  data-action={action}
  aria-label={rest['aria-label'] ?? getDatePickerHeaderActionLabel(action, calendar.controller.getOptions().locale)}
  class={cn(datePickerHeaderNavigationClassName, className)}
  onclick={runAction}
>
  {#if children}
    {@render children()}
  {:else}
    {#if isDouble}
      {#if isPrevious}
        <ChevronsLeftIcon class="size-4 rtl:rotate-180" />
      {:else}
        <ChevronsRightIcon class="size-4 rtl:rotate-180" />
      {/if}
    {:else if isPrevious}
      <ChevronLeftIcon class="size-4 rtl:rotate-180" />
    {:else}
      <ChevronRightIcon class="size-4 rtl:rotate-180" />
    {/if}
  {/if}
</Button>
