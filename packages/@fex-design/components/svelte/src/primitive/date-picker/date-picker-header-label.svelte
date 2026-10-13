<script lang="ts">
  import {
    getDatePickerHeaderLabelParts,
    getNextPanelByHeaderLabel,
  } from "@fex-design/core/date-picker/panel";
  import type { DatePickerHeaderLabelPart } from "@fex-design/core/date-picker/types";
  import { datePickerHeaderLabelClassName } from "@fex-design/components-styles/date-picker";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { getContext } from "svelte";
  import { Button } from "@fex-design/svelte/primitive/button";
  import {
    calendarContextKey,
    type CalendarContextValue,
  } from "../calendar/context";
  import { useHeaderOwner } from "./date-picker-header-owner";

  interface Props extends Omit<HTMLButtonAttributes, "children" | "type"> {
    part: DatePickerHeaderLabelPart;
    children?: Snippet;
  }
  let { part, class: className, children, onclick, ...rest }: Props = $props();
  const owner = useHeaderOwner("DatePickerHeaderLabel");
  const calendar = getContext<CalendarContextValue>(calendarContextKey);
  let hovered = $state(false);
  const visible = $derived(
    getDatePickerHeaderLabelParts(owner.picker, calendar.getState().panel).includes(
      part,
    ),
  );
  const label = $derived.by(() => {
    if (part === "month") return `${calendar.getState().viewDate.month}月`;
    const decadeStart = Math.floor(calendar.getState().viewDate.year / 10) * 10;
    return calendar.getState().panel === "decade"
      ? `${decadeStart}-${decadeStart + 9}年`
      : `${calendar.getState().viewDate.year}年`;
  });

  function selectPanel(event: MouseEvent) {
    onclick?.(event as Parameters<NonNullable<typeof onclick>>[0]);
    if (event.defaultPrevented) return;
    const nextPanel = getNextPanelByHeaderLabel(part);
    calendar.controller.setPanel(nextPanel);
  }
</script>

{#if visible}
  <Button
    {...rest}
    data-slot="date-picker-header-label"
    data-part={part}
    data-hovered={hovered ? "true" : undefined}
    class={cn(datePickerHeaderLabelClassName, className)}
    onmouseenter={() => (hovered = true)}
    onmouseleave={() => (hovered = false)}
    onclick={selectPanel}
  >
    {#if children}{@render children()}{:else}{label}{/if}
  </Button>
{/if}
