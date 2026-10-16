<script lang="ts">
  import { isPickerActionBlocked } from '@fex-design/core/date-picker/view';

  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { cn } from '@fex-design/utils';
  import { datePickerConfirmClassName } from '@fex-design/components-styles/date-picker';
  import { Button } from '../button';
  import { useFooterOwner } from './date-picker-footer-owner';
  let { class: className, children, onclick, ...rest }: Omit<HTMLButtonAttributes,'children'> & { children?: Snippet } = $props();
  const owner = useFooterOwner();
</script>
<Button {...rest} type="button" variant="solid" color="primary" data-slot="date-picker-confirm" class={cn(datePickerConfirmClassName, className)} disabled={!owner.getCanConfirm() || rest.disabled} onclick={event => { onclick?.(event); if (!isPickerActionBlocked(event)) { owner.confirm(); } }}>
  {#if children}{@render children()}{:else}确定{/if}
</Button>
