<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setContext } from 'svelte';
  import type { PopoverOptions } from '@fex-design/core/popover/types';
  import { createPopover } from './create-popover.svelte';
  import { popoverContextKey } from './popover-context';

  let { children, ...options }: PopoverOptions & {
    children?: Snippet<[{ open: boolean; close: () => void }]>;
  } = $props();
  const context = createPopover(() => options);
  const { snapshot, overlay } = context;
  setContext(popoverContextKey, context);
</script>

{@render children?.({ open: $snapshot.open, close: overlay.close })}
