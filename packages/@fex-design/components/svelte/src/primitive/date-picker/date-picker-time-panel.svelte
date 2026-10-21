<script lang="ts">
  import { getContext } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "@fex-design/utils";
  import { getDatePickerTimeColumns } from "@fex-design/core/date-picker/time";
  import { datePickerTimePanelClassName } from "@fex-design/components-styles/date-picker";
  import {
    TimePickerRoot,
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
    TimePickerPeriodColumn,
  } from "@fex-design/svelte/primitive/time-picker";
  import {
    datePickerContextKey,
    rangePickerContextKey,
    type DatePickerContextValue,
    type RangePickerContextValue,
  } from "./context";
  let {
    range = false,
    class: className,
    ...rest
  }: HTMLAttributes<HTMLDivElement> & { range?: boolean } = $props();
  const single = getContext<DatePickerContextValue | undefined>(
    datePickerContextKey,
  );
  const interval = getContext<RangePickerContextValue | undefined>(
    rangePickerContextKey,
  );
  const owner = $derived(range ? interval : single);
</script>

{#if owner?.showTime}
  <div
    {...rest}
    data-slot="date-picker-time-panel"
    class={cn(datePickerTimePanelClassName, className)}
  >
    <TimePickerRoot
      value={owner.getTimeValue()}
      format={owner.timeOptions.format}
      use12Hours={owner.timeOptions.use12Hours}
      disabled={owner.disabled}
      disabledTime={owner.timeOptions.disabledTime}
      onchange={owner.selectTime}
    >
      <TimePickerPanel
        >{#each getDatePickerTimeColumns(owner.timeOptions) as column (column.unit)}
          {#if column.unit === "hour"}<TimePickerHourColumn
              step={owner.timeOptions.step?.hour}
            />
          {:else if column.unit === "minute"}<TimePickerMinuteColumn
              step={owner.timeOptions.step?.minute}
            />
          {:else if column.unit === "second"}<TimePickerSecondColumn
              step={owner.timeOptions.step?.second}
            />
          {:else}<TimePickerPeriodColumn />{/if}
        {/each}</TimePickerPanel
      >
    </TimePickerRoot>
  </div>
{/if}
