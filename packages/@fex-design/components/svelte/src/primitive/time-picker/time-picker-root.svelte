<script lang="ts">
  import { useTimePicker } from "./use-time-picker.svelte";
  import type {
    DisabledTime,
    TimePickerChangeDetails,
    TimeValue,
  } from "@fex-design/core/time-picker/types";
  import { setContext, type Snippet, type ComponentProps } from "svelte";
  import Popover from "../popover/popover.svelte";
  import { timePickerContextKey, type TimePickerContext } from "./context";

  interface Props extends Omit<
    ComponentProps<typeof Popover>,
    "children" | "disabled"
  > {
    value?: TimeValue | null | undefined;
    defaultValue?: TimeValue | null;
    popoverProps?: import("@fex-design/core/time-picker/types").TimePickerPopoverOptions;
    format?: string;
    onchange?: (
      value: TimeValue | null,
      details: TimePickerChangeDetails,
    ) => void;
    use12Hours?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    disabledTime?: DisabledTime | undefined;
    children?: Snippet;
  }

  let {
    value,
    defaultValue,
    format,
    popoverProps,
    onchange,
    use12Hours = false,
    disabled = false,
    readOnly = false,
    disabledTime,
    children,
    ...rest
  }: Props = $props();
  const { controller, snapshot } = useTimePicker(() => ({
    value,
    defaultValue,
    format,
    use12Hours,
    disabled,
    readOnly,
    disabledTime,
    onChange: (next, details) => onchange?.(next, details),
  }));
  setContext(timePickerContextKey, {
    controller,
    snapshot,
    format: () => format ?? (use12Hours ? "hh:mm:ss A" : "HH:mm:ss"),
    use12Hours: () => use12Hours,
    disabled: () => disabled,
    readOnly: () => readOnly,
    disabledTime: () => disabledTime,
  } satisfies TimePickerContext);
</script>

<Popover {...rest} {...popoverProps} {disabled} trigger={["focus", "click"]}
  >{@render children?.()}</Popover
>
