<script lang="ts">
  import DatePickerTimePanel from "./date-picker-time-panel.svelte";
  import { datePickerDateTimeLayoutClassName } from "@fex-design/components-styles/date-picker";
  import { usePickerAppearance } from "./appearance-context";
  import type { DatePickerCalendarProps } from "./appearance.types";
  import { getPickerCalendarProps } from "@fex-design/core/date-picker/safe-props";
  import DatePickerPanelContent from "./date-picker-panel-content.svelte";

  import { type CalendarDate } from "@fex-design/core/calendar";
  import { getGranularityByPicker } from "@fex-design/core/date-picker/panel";
  import { datePickerPanelClassName } from "@fex-design/components-styles/date-picker";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { getContext } from "svelte";

  import CalendarRoot from "../calendar/calendar-root.svelte";

  import {
    datePickerContextKey,
    rangePickerContextKey,
    type DatePickerContextValue,
    type RangePickerContextValue,
  } from "./context";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    calendarProps?: DatePickerCalendarProps | undefined;
    class?: string | undefined;
    range?: boolean | undefined;
    panelViewDate?: CalendarDate | undefined;
    children?: Snippet | undefined;
  }
  let {
    class: className,
    style,
    calendarProps,
    range = false,
    panelViewDate,
    children,
    onmouseleave,
    ...rest
  }: Props = $props();
  // svelte-ignore state_referenced_locally -- range selects the immutable context branch at mount.
  const datePicker = range
    ? undefined
    : getContext<DatePickerContextValue | undefined>(datePickerContextKey);
  // svelte-ignore state_referenced_locally -- range selects the immutable context branch at mount.
  const rangePicker = range
    ? getContext<RangePickerContextValue | undefined>(rangePickerContextKey)
    : undefined;
  const owner = rangePicker ?? datePicker;
  if (!owner)
    throw new Error(
      "DatePickerPanel must be used within DatePickerRoot or RangePickerRoot",
    );

  const appearance = usePickerAppearance();
  const calendar = $derived(
    getPickerCalendarProps(calendarProps ?? appearance().calendarProps),
  );
  const displayRange = $derived(
    rangePicker ? rangePicker.getDisplayRange() : undefined,
  );

  function disabledDate(date: CalendarDate) {
    return rangePicker
      ? (rangePicker.disabledDate?.(date, rangePicker.getActivePart()) ?? false)
      : (datePicker?.disabledDate?.(date) ?? false);
  }
</script>

<div
  class={owner.showTime && !range
    ? datePickerDateTimeLayoutClassName
    : "contents"}
>
  <CalendarRoot
    {...rest}
    monthSelection="drilldown"
    locale={calendar.locale}
    style={[calendar.style, style].filter(Boolean).join(";")}
    class={cn(datePickerPanelClassName, calendar.class, className)}
    value={datePicker?.getCalendarValue() ?? null}
    values={datePicker?.getCalendarValues()}
    range={displayRange}
    viewDate={panelViewDate ?? owner.getViewDate()}
    panel={owner.getPanel()}
    granularity={getGranularityByPicker(owner.picker)}
    weekStartsOn={owner.weekStartsOn}
    min={owner.minDate}
    max={owner.maxDate}
    {disabledDate}
    onSelect={owner.select}
    onCellSelect={owner.previewCell}
    onCellHover={(cell) => owner.setHoverValue(cell.value)}
    onPanelChange={owner.setPanel}
    onViewDateChange={owner.setViewDate}
    onmouseleave={(event) => {
      onmouseleave?.(event);
      if (!event.defaultPrevented) owner.setHoverValue(null);
    }}
  >
    {#if children}
      {@render children()}
    {:else}
      <DatePickerPanelContent calendarProps={calendar} />
    {/if}
  </CalendarRoot>
  {#if owner.showTime && !range}<DatePickerTimePanel />{/if}
</div>
