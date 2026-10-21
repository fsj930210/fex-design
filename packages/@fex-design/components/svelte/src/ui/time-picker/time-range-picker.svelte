<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { analyzeTimeFormat } from "@fex-design/core/date/utils";
  import {
    TimeRangePickerRoot,
    TimeRangePickerTrigger,
    TimeRangePickerFooter,
    TimePickerPortal,
    TimePickerContent,
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
    TimePickerPeriodColumn,
  } from "@fex-design/svelte/primitive/time-picker";
  import type TimePicker from "./time-picker.svelte";
  type Props = Omit<ComponentProps<typeof TimeRangePickerRoot>, "children"> &
    ComponentProps<typeof TimeRangePickerTrigger> &
    Pick<
      ComponentProps<typeof TimePicker>,
      | "contentProps"
      | "panelProps"
      | "hourColumnProps"
      | "minuteColumnProps"
      | "secondColumnProps"
      | "periodColumnProps"
    > & {
      footerProps?: ComponentProps<typeof TimeRangePickerFooter> | undefined;
      step?: { hour?: number; minute?: number; second?: number };
    };
  let {
    contentProps,
    panelProps,
    hourColumnProps,
    minuteColumnProps,
    secondColumnProps,
    periodColumnProps,
    footerProps,
    class: className,
    style,
    dir,
    size,
    variant,
    startInputProps,
    endInputProps,
    placeholder,
    allowClear,
    prefix,
    suffix,
    step,
    ...options
  }: Props = $props();
  const columns = $derived(
    analyzeTimeFormat(
      options.format ?? (options.use12Hours ? "hh:mm:ss A" : "HH:mm:ss"),
      options.use12Hours,
    ).columns,
  );
</script>

<TimeRangePickerRoot {...options}>
  <TimeRangePickerTrigger
    class={className}
    {style}
    {dir}
    {size}
    {variant}
    {startInputProps}
    {endInputProps}
    {placeholder}
    {allowClear}
    {prefix}
    {suffix}
  />
  <TimePickerPortal
    ><TimePickerContent {...contentProps}
      ><TimePickerPanel {...panelProps}>
        {#each columns as column (column.unit)}
          {#if column.unit === "hour"}<TimePickerHourColumn
              step={step?.hour}
              {...hourColumnProps}
            />
          {:else if column.unit === "minute"}<TimePickerMinuteColumn
              step={step?.minute}
              {...minuteColumnProps}
            />
          {:else if column.unit === "second"}<TimePickerSecondColumn
              step={step?.second}
              {...secondColumnProps}
            />
          {:else}<TimePickerPeriodColumn {...periodColumnProps} />{/if}
        {/each}
      </TimePickerPanel><TimeRangePickerFooter
        {...footerProps}
      /></TimePickerContent
    ></TimePickerPortal
  >
</TimeRangePickerRoot>
