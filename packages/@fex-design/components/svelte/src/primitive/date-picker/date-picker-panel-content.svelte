<script lang="ts">
  import { getDatePickerCellLabel } from "@fex-design/core/date-picker/panel";
  import { calendarDefaultWeekLabels } from "@fex-design/core/calendar";
  import { cn } from "@fex-design/utils";
  import { getDatePickerPanelView } from "@fex-design/core/date-picker/view";
  import { getDatePickerHeaderActions } from "@fex-design/core/date-picker/panel";
  import {
    getDatePickerRowClassName,
    getDatePickerCellClassName,
    datePickerCellClassName,
    datePickerGridClassName,
    datePickerHeaderSideClassName,
    datePickerWeekHeaderClassName,
  } from "@fex-design/components-styles/date-picker";
  import {
    CalendarCell,
    CalendarCellTrigger,
    CalendarGrid,
    CalendarWeekHeader,
  } from "../calendar";
  import { useCalendarContext } from "../calendar/context";
  import DatePickerHeader from "./date-picker-header.svelte";
  import DatePickerHeaderButton from "./date-picker-header-button.svelte";
  import DatePickerHeaderLabel from "./date-picker-header-label.svelte";
  import DatePickerHeaderTitle from "./date-picker-header-title.svelte";
  import type { DatePickerCalendarProps } from "./appearance.types";
  import { useHeaderOwner } from "./date-picker-header-owner";
  let { calendarProps }: { calendarProps?: DatePickerCalendarProps } = $props();
  const calendar = useCalendarContext("DatePickerPanelContent");
  const owner = useHeaderOwner("DatePickerPanelContent");
  const view = $derived(getDatePickerPanelView(calendar.getState().panel));
</script>

<DatePickerHeader
  class={calendarProps?.classNames?.header}
  style={calendarProps?.styles?.header}
>
  <div class={datePickerHeaderSideClassName}>
    <DatePickerHeaderButton
      action={getDatePickerHeaderActions(calendar.getState().panel).previous}
    />{#if view.showMonthNavigation}<DatePickerHeaderButton
        action="previous-month"
      />{/if}
  </div>
  <DatePickerHeaderTitle
    ><DatePickerHeaderLabel part="year" /><DatePickerHeaderLabel
      part="month"
    /></DatePickerHeaderTitle
  >
  <div class={datePickerHeaderSideClassName}>
    {#if view.showMonthNavigation}<DatePickerHeaderButton
        action="next-month"
      />{/if}<DatePickerHeaderButton
      action={getDatePickerHeaderActions(calendar.getState().panel).next}
    />
  </div>
</DatePickerHeader>
{#if view.showWeekHeader}<CalendarWeekHeader
    labels={calendarProps?.locale?.weekdays ?? calendarDefaultWeekLabels}
    class={cn(
      datePickerWeekHeaderClassName,
      calendarProps?.classNames?.weekHeader,
    )}
    style={calendarProps?.styles?.weekHeader}
  />{/if}
<CalendarGrid
  onmouseleave={() => owner.setHoverValue(null)}
  class={cn(datePickerGridClassName, calendarProps?.classNames?.grid)}
  style={calendarProps?.styles?.grid}
  rowProps={{
    class: cn(
      getDatePickerRowClassName(calendar.getState().panel),
      calendarProps?.classNames?.row,
    ),
    style: calendarProps?.styles?.row,
  }}
>
  {#snippet children(cell)}
    <CalendarCell
      {cell}
      onmouseenter={cell.state.disabled
        ? () => owner.setHoverValue(null)
        : undefined}
      class={cn(
        datePickerCellClassName,
        getDatePickerCellClassName(cell.panel),
        calendarProps?.classNames?.cell,
      )}
      style={calendarProps?.styles?.cell}
    >
      <CalendarCellTrigger
        {cell}
        class={calendarProps?.classNames?.cellTrigger}
        style={calendarProps?.styles?.cellTrigger}
        >{#snippet children()}{getDatePickerCellLabel(
            cell,
            calendarProps?.locale,
          )}{/snippet}</CalendarCellTrigger
      >
      {#if calendarProps?.cellRender}<div
          data-slot="calendar-cell-content"
          class={calendarProps.classNames?.cellContent}
          style={calendarProps.styles?.cellContent}
        >
          {@render calendarProps.cellRender({
            state: calendar.getState(),
            controller: calendar.controller,
            cell,
          })}
        </div>{/if}
    </CalendarCell>
  {/snippet}
</CalendarGrid>
