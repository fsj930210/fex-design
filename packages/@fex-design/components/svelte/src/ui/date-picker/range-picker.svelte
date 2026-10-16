<script lang="ts">
  import { RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup, DatePickerFooter } from '@fex-design/svelte/primitive/date-picker';
  import type { RangePickerProps } from './range-picker.types';
  let { startPlaceholder, endPlaceholder, separator, suffix, size, variant, style, class: className, trigger, container, panel, footer, ...options }: RangePickerProps = $props();
</script>
<RangePickerRoot {...options} {container}>
  {#snippet children(state)}
    <RangePickerTrigger {startPlaceholder} {endPlaceholder} {separator} {suffix} {size} {variant} class={className} {style} children={trigger} />
    <RangePickerContent>
      {#snippet defaultPanel()}<RangePickerPanelGroup />{/snippet}
      {#if panel}{@render panel(defaultPanel, state)}{:else}{@render defaultPanel()}{/if}
      <DatePickerFooter children={footer} />
    </RangePickerContent>
  {/snippet}
</RangePickerRoot>
