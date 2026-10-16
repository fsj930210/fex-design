<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  export interface DatePickerFooterActions {
    canConfirm: () => boolean;
    close: () => void;
    clear: () => void;
    confirm: () => void;
    cancel: () => void;
    today: () => void;
  }
  export type DatePickerFooterContent = Snippet<[DatePickerFooterActions]> | string | number | null;
  export type DatePickerFooterProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & { children?: DatePickerFooterContent | undefined };
</script>
<script lang="ts">
  import { usePickerAppearance } from './appearance-context';
  const appearance = usePickerAppearance();
  import { cn } from '@fex-design/utils';
  import { getPickerContentKind } from '@fex-design/core/date-picker/view';
  import { datePickerFooterClassName } from '@fex-design/components-styles/date-picker';
  import { useFooterOwner } from './date-picker-footer-owner';
  import DatePickerToday from './date-picker-today.svelte';
  import DatePickerCancel from './date-picker-cancel.svelte';
  import DatePickerConfirm from './date-picker-confirm.svelte';
  let { class: className, style, children, ...rest }: DatePickerFooterProps = $props();
  const owner = useFooterOwner();
  const actions = { canConfirm: owner.getCanConfirm, close: owner.close, clear: owner.clear, confirm: owner.confirm, cancel: owner.cancel, today: owner.today };
</script>
{#if getPickerContentKind(children) !== 'hidden'}
  <div {...rest} data-slot="date-picker-footer" class={cn(datePickerFooterClassName, appearance().classNames?.footer, className)} style={[appearance().styles?.footer, style].filter(Boolean).join(';')}>
    {#if typeof children === 'function'}
      {@render children(actions)}
    {:else if getPickerContentKind(children) === 'custom'}
      {children}
    {:else}
      <DatePickerToday class={appearance().classNames?.today} style={appearance().styles?.today} />
      {#if owner.footerView.showCancel}<DatePickerCancel class={appearance().classNames?.cancel} style={appearance().styles?.cancel} />{/if}
      {#if owner.footerView.showConfirm}<DatePickerConfirm class={appearance().classNames?.confirm} style={appearance().styles?.confirm} />{/if}
    {/if}
  </div>
{/if}
