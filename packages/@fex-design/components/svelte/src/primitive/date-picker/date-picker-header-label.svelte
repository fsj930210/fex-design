<script lang="ts">
  import { isPickerActionBlocked } from '@fex-design/core/date-picker/view';

import { getDatePickerHeaderLabel } from '@fex-design/core/date-picker/panel';
  import { getDatePickerHeaderLabelParts, getNextPanelByHeaderLabel } from "@fex-design/core/date-picker/panel";
  import type { DatePickerHeaderLabelPart } from "@fex-design/core/date-picker/types";
  import { datePickerHeaderLabelClassName } from "@fex-design/components-styles/date-picker";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { getContext } from "svelte";
  import { Button } from "@fex-design/svelte/primitive/button";
  import { calendarContextKey, type CalendarContextValue } from "../calendar/context";
  import { useHeaderOwner } from "./date-picker-header-owner";

  interface Props extends Omit<HTMLButtonAttributes, "children" | "type"> {
    part: DatePickerHeaderLabelPart;
    children?: Snippet;
  }
  let { part, class: className, children, onclick, onmouseenter, onmouseleave, ...rest }: Props = $props();
  const owner = useHeaderOwner("DatePickerHeaderLabel");
  const calendar = getContext<CalendarContextValue>(calendarContextKey);
  let hovered = $state(false);
  const visible = $derived(
    getDatePickerHeaderLabelParts(owner.picker, calendar.getState().panel).includes(
      part,
    ),
  );
  const label = $derived(getDatePickerHeaderLabel(calendar.getState().viewDate, calendar.getState().panel, part, calendar.controller.getOptions().locale));

  function selectPanel(event: MouseEvent) {
    onclick?.(event as Parameters<NonNullable<typeof onclick>>[0]);
    if (isPickerActionBlocked(event)) return;
    const nextPanel = getNextPanelByHeaderLabel(part);
    calendar.controller.setPanel(nextPanel);
  }
</script>

  <Button
    {...rest}
    type="button"
    hidden={!visible || rest.hidden}
    data-slot="date-picker-header-label"
    data-part={part}
    data-hovered={hovered ? "true" : undefined}
    class={cn(datePickerHeaderLabelClassName, className)}
    onmouseenter={event => { hovered = true; onmouseenter?.(event); }}
    onmouseleave={event => { hovered = false; onmouseleave?.(event); }}
    onclick={selectPanel}
  >
    {#if children}{@render children()}{:else}{label}{/if}
  </Button>
