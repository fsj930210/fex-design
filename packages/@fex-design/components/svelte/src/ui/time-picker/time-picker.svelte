<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import { analyzeTimeFormat } from '@fex-design/core/date/utils';
  import { TimePickerRoot, TimePickerTrigger, TimePickerPortal, TimePickerContent, TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn, TimePickerPeriodColumn } from '@fex-design/svelte/primitive/time-picker';
  type Props = Omit<ComponentProps<typeof TimePickerRoot>, 'children'> & Pick<ComponentProps<typeof TimePickerTrigger>, 'class' | 'style' | 'size' | 'variant' | 'placeholder' | 'allowClear' | 'invalid' | 'prefix' | 'suffix' | 'inputProps'> & {
    step?: { hour?: number; minute?: number; second?: number };
    trigger?: ComponentProps<typeof TimePickerTrigger>['children'];
    panel?: Snippet<[Snippet]>;
    footer?: Snippet;
  };
  let { class: className, style, size, variant, placeholder, allowClear, invalid, prefix, suffix, inputProps, step, trigger, panel, footer, ...options }: Props = $props();
  const columns = $derived(analyzeTimeFormat(options.format ?? (options.use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss'), options.use12Hours).columns);
</script>
<TimePickerRoot {...options}>
  <TimePickerTrigger class={className} {style} {size} {variant} {placeholder} {allowClear} {invalid} {prefix} {suffix} {inputProps} children={trigger} />
  <TimePickerPortal><TimePickerContent>
    {#snippet defaultPanel()}<TimePickerPanel>{#each columns as column (column.unit)}
      {#if column.unit === 'hour'}<TimePickerHourColumn step={step?.hour} />
      {:else if column.unit === 'minute'}<TimePickerMinuteColumn step={step?.minute} />
      {:else if column.unit === 'second'}<TimePickerSecondColumn step={step?.second} />
      {:else}<TimePickerPeriodColumn />{/if}
    {/each}</TimePickerPanel>{/snippet}
    {#if panel}{@render panel(defaultPanel)}{:else}{@render defaultPanel()}{/if}
    {@render footer?.()}
  </TimePickerContent></TimePickerPortal>
</TimePickerRoot>
