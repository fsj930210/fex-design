<script lang="ts">
  import type { CalendarDate } from "@fex-design/core/calendar";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import DatePickerPanel from "./date-picker-panel.svelte";

  let {
    class: className,
    panelViewDate,
    children,
    ...rest
  }: Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    class?: string | undefined;
    panelViewDate?: CalendarDate | undefined;
    children?: Snippet | undefined;
  } = $props();
</script>

{#if children}
  <DatePickerPanel {...rest} range class={className} {panelViewDate}>
    {@render children()}
  </DatePickerPanel>
{:else}
  <DatePickerPanel {...rest} range class={className} {panelViewDate} />
{/if}
