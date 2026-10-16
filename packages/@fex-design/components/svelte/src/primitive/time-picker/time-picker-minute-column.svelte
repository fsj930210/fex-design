<script lang="ts">
  import {
    createMinuteOptions,
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
    isItemDisabled,
    ...rest
  }: Omit<ComponentProps<typeof TimePickerColumn>, 'options' | 'selectedValue' | 'onselect' | 'item'> & {
    class?: string | undefined;
    item?: ComponentProps<typeof TimePickerColumn>["item"];
    step?: number | undefined;
    disabled?: boolean | undefined;
    isItemDisabled?: ((value: number) => boolean) | undefined;
  } = $props();
  const context = getContext<TimePickerContext>(timePickerContextKey);
  const options = $derived(
    createMinuteOptions(
      step,
      resolveDisabledTime(context.disabledTime(), context.snapshot().value)
        .minutes,
    ).map((item) => ({
      ...item,
      disabled: item.disabled || Boolean(isItemDisabled?.(item.value)),
    })),
  );
</script>

<TimePickerColumn
    {...rest}
  {item}
  class={className}
  {options}
  selectedValue={context.snapshot().value?.minute}
  {disabled}
  onselect={(value) => context.controller.selectMinute(value as number)}
/>
