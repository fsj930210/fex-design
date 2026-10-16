<script lang="ts">
  import {
    createPeriodOptions,
    getDisplayedPeriod,
  } from "@fex-design/core/time-picker/options";
  import type { TimePeriod } from "@fex-design/core/time-picker/types";
  import { getContext, type ComponentProps } from "svelte";
  import { timePickerContextKey, type TimePickerContext } from "./context";
  import TimePickerColumn from "./time-picker-column.svelte";
  let {
    labels,
    class: className,
    item,
    disabled = false,
    isItemDisabled,
    ...rest
  }: Omit<ComponentProps<typeof TimePickerColumn>, 'options' | 'selectedValue' | 'onselect' | 'item'> & {
    class?: string | undefined;
    item?: ComponentProps<typeof TimePickerColumn>["item"];
    labels?: { am: string; pm: string } | undefined;
    disabled?: boolean | undefined;
    isItemDisabled?: ((value: TimePeriod) => boolean) | undefined;
  } = $props();
  const context = getContext<TimePickerContext>(timePickerContextKey);
  const options = $derived(
    createPeriodOptions(labels).map((item) => ({
      ...item,
      disabled: item.disabled || Boolean(isItemDisabled?.(item.value)),
    })),
  );
  const selected = $derived(
    context.snapshot().value
      ? getDisplayedPeriod(context.snapshot().value!)
      : undefined,
  );
</script>

{#if context.use12Hours()}<TimePickerColumn
    {...rest}
    {item}
    class={className}
    {options}
    selectedValue={selected}
    {disabled}
    onselect={(value) => context.controller.selectPeriod(value as TimePeriod)}
  />{/if}
