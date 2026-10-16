<script lang="ts">
  import { getContext } from 'svelte';
  import { getTimePickerDirection } from '@fex-design/core/time-picker/scroll';
  import { popoverContextKey, type PopoverContext } from '../popover/popover-context';
  import { cn } from '@fex-design/utils';
  import type { ComponentProps } from 'svelte';
  import { PopoverContent } from '../popover';
  let { class: className, style, children, ...rest }: ComponentProps<typeof PopoverContent> = $props();
  const popover = getContext<PopoverContext>(popoverContextKey);
</script>
<PopoverContent {...rest} dir={rest.dir ?? getTimePickerDirection(popover.triggerElement.current)} class={cn('overflow-hidden p-0', className)} style={['width:var(--floating-reference-width);max-width:var(--floating-available-width);max-height:var(--floating-available-height)', style].filter(Boolean).join(';')}>
  {@render children?.()}
</PopoverContent>
