<script lang="ts">
  import { setContext, type Snippet } from "svelte";
  import type { TimeRangePickerOptions } from "@fex-design/core/time-picker/range-types";
  import type { TimePickerPopoverOptions } from "@fex-design/core/time-picker/types";
  import TimePickerRoot from "./time-picker-root.svelte";
  import { useTimeRangePicker } from "./use-time-range-picker.svelte";
  import {
    timeRangePickerContextKey,
    type TimeRangePickerContext,
  } from "./time-range-picker-context";
  interface Props extends Omit<TimeRangePickerOptions, "onChange"> {
    onchange?: TimeRangePickerOptions["onChange"];
    popoverProps?: TimePickerPopoverOptions;
    children?: Snippet;
  }
  let props: Props = $props();
  const range = useTimeRangePicker(() => ({
    ...props,
    onChange: props.onchange,
  }));
  const { controller, snapshot } = range;
  setContext(timeRangePickerContextKey, {
    ...range,
    options: () => props,
  } satisfies TimeRangePickerContext);
</script>

<TimePickerRoot
  value={snapshot().draft[snapshot().activePart === "start" ? 0 : 1]}
  open={snapshot().open}
  format={props.format}
  use12Hours={props.use12Hours}
  disabled={props.disabled}
  readOnly={props.readOnly}
  disabledTime={props.disabledTime}
  popoverProps={props.popoverProps}
  onchange={(value, details) => controller.select(value, details.reason)}
  onOpenChange={controller.setOpen}
>
  {@render props.children?.()}
</TimePickerRoot>
