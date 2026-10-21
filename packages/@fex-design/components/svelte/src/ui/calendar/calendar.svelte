<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import {
    getCalendarUIOptions,
    type CalendarUIOptions,
  } from "@fex-design/core/calendar";
  import { calendarUIRootClassName } from "@fex-design/components-styles/calendar";
  import { cn } from "@fex-design/utils";
  import { CalendarRoot } from "../../primitive/calendar";
  import CalendarContent from "./calendar-content.svelte";
  import type { CalendarAppearance } from "./types";
  type Props = Omit<HTMLAttributes<HTMLDivElement>, "children" | "onchange"> &
    CalendarUIOptions &
    CalendarAppearance & { ref?: HTMLDivElement | null };
  let {
    value,
    defaultValue,
    values,
    range,
    viewDate,
    defaultViewDate,
    panel,
    defaultPanel,
    min,
    max,
    today,
    disabledDate,
    weekStartsOn,
    onChange,
    onSelect,
    onPanelChange,
    onViewDateChange,
    onCellSelect,
    onCellHover,
    fullscreen,
    showWeek,
    locale,
    headerProps,
    headerRender,
    cellRender,
    fullCellRender,
    footerRender,
    classNames,
    styles,
    class: className,
    ref = $bindable(null),
    ...attrs
  }: Props = $props();
  const options = $derived({
    value,
    defaultValue,
    values,
    range,
    viewDate,
    defaultViewDate,
    panel,
    defaultPanel,
    min,
    max,
    today,
    disabledDate,
    weekStartsOn,
    onChange,
    onSelect,
    onPanelChange,
    onViewDateChange,
    onCellSelect,
    onCellHover,
    fullscreen,
    showWeek,
    locale,
  });
</script>

<CalendarRoot
  {...attrs}
  {...getCalendarUIOptions(options)}
  bind:ref
  class={cn(calendarUIRootClassName, className)}
  data-fullscreen={fullscreen !== false}
>
  <CalendarContent
    {headerProps}
    {options}
    {headerRender}
    {cellRender}
    {fullCellRender}
    {footerRender}
    {classNames}
    {styles}
  />
</CalendarRoot>
