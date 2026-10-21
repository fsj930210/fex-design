<script lang="ts">
  import { cn } from "@fex-design/utils";
  import {
    createHourOptions,
    getDisplayedHour,
    getDisplayedPeriod,
    resolveDisabledTime,
  } from "@fex-design/core/time-picker/options";
  import { getContext, type ComponentProps } from "svelte";
  import { timePickerContextKey, type TimePickerContext } from "./context";
  import TimePickerColumn from "./time-picker-column.svelte";
  let {
    class: className,
    item,
    step,
    disabled = false,
    columnProps,
    isItemDisabled,
    ...rest
  }: Omit<
    ComponentProps<typeof TimePickerColumn>,
    "options" | "selectedValue" | "onselect" | "item"
  > & {
    class?: string | undefined;
    item?: ComponentProps<typeof TimePickerColumn>["item"];
    step?: number | undefined;
    disabled?: boolean | undefined;
    columnProps?:
      | Omit<
          ComponentProps<typeof TimePickerColumn>,
          "options" | "selectedValue" | "onselect" | "children"
        >
      | undefined;
    isItemDisabled?: ((value: number) => boolean) | undefined;
  } = $props();
  const context = getContext<TimePickerContext>(timePickerContextKey);
  const options = $derived(
    createHourOptions({
      step,
      use12Hours: context.use12Hours(),
      period: context.snapshot().value
        ? getDisplayedPeriod(context.snapshot().value!)
        : "am",
      disabled: resolveDisabledTime(
        context.disabledTime(),
        context.snapshot().value,
      ).hours,
    }).map((item) => ({
      ...item,
      disabled: item.disabled || Boolean(isItemDisabled?.(item.value)),
    })),
  );
  const selected = $derived(
    context.snapshot().value
      ? getDisplayedHour(context.snapshot().value!, context.use12Hours())
      : undefined,
  );
</script>

<TimePickerColumn
  {...rest}
  {...columnProps}
  item={item ?? columnProps?.item}
  class={cn(className, columnProps?.class)}
  {options}
  selectedValue={selected}
  disabled={disabled || columnProps?.disabled}
  onselect={(value) =>
    context.controller.selectHour(value as number, context.use12Hours())}
/>
