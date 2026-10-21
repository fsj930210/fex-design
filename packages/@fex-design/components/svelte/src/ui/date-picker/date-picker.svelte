<script lang="ts">
  import {
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    DatePickerFooter,
  } from "@fex-design/svelte/primitive/date-picker";
  import type { DatePickerProps } from "./date-picker.types";
  let {
    placeholder,
    prefix,
    suffix,
    size,
    variant,
    style,
    class: className,
    trigger,
    container,
    panel,
    footer,
    ...options
  }: DatePickerProps = $props();
</script>

<DatePickerRoot {...options} {container}>
  {#snippet children(state)}
    <DatePickerTrigger
      {placeholder}
      {prefix}
      {suffix}
      {size}
      {variant}
      class={className}
      {style}
      children={trigger}
    />
    <DatePickerContent>
      {#snippet defaultPanel()}<DatePickerPanel />{/snippet}
      {#if panel}{@render panel(
          defaultPanel,
          state,
        )}{:else}{@render defaultPanel()}{/if}
      <DatePickerFooter children={footer} />
    </DatePickerContent>
  {/snippet}
</DatePickerRoot>
