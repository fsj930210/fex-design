<script lang="ts">
  import DatePickerTimePanel from "./date-picker-time-panel.svelte";
  import { usePickerAppearance } from "./appearance-context";
  const appearance = usePickerAppearance();
  import { getVisibleRangePanelViewDates } from "@fex-design/core/date-picker/panel";
  import { datePickerPanelsClassName } from "@fex-design/components-styles/date-picker";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { useRangePickerContext } from "./context";
  import RangePickerPanel from "./range-picker-panel.svelte";

  let {
    class: className,
    style,
    panelCount = 2,
    children,
    onmouseleave,
    role = "group",
    ...rest
  }: Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    panelCount?: 1 | 2;
    children?: Snippet;
  } = $props();
  const context = useRangePickerContext("RangePickerPanelGroup");
  const visibleDates = $derived(
    getVisibleRangePanelViewDates(
      context.getViewDate(),
      context.getPanel(),
      context.showTime ? 1 : panelCount,
    ),
  );
</script>

<div
  {...rest}
  {role}
  data-slot="range-picker-panel-group"
  class={cn(
    datePickerPanelsClassName,
    appearance().classNames?.panelGroup,
    className,
  )}
  style={[appearance().styles?.panelGroup, style].filter(Boolean).join(";")}
  onmouseleave={(event) => {
    onmouseleave?.(event);
    if (!event.defaultPrevented) context.setHoverValue(null);
  }}
>
  {#if children}
    {@render children()}
  {:else}
    {#each visibleDates as date (date.toString())}
      <RangePickerPanel panelViewDate={date} />
    {/each}
    {#if context.showTime}<DatePickerTimePanel range />{/if}
  {/if}
</div>
