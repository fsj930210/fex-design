<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Button } from '@fex-design/svelte/primitive/button';
  import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose, DialogFullscreenToggle } from '@fex-design/svelte/primitive/dialog';

  interface Props {
    open?: boolean;
    defaultOpen?: boolean;
    title?: string | Snippet;
    header?: Snippet;
    children?: Snippet;
    footer?: Snippet | null;
    closable?: boolean;
    fullscreen?: boolean | { mode?: 'viewport' | 'screen' };
    okText?: Snippet;
    cancelText?: Snippet;
    onOpenChange?: (open: boolean, info: unknown) => void;
  }
  let { open = $bindable(), defaultOpen, title, header, children, footer, closable = true, fullscreen, okText, cancelText, onOpenChange }: Props = $props();

  function handleOpenChange(nextOpen: boolean, info: unknown) {
    open = nextOpen;
    onOpenChange?.(nextOpen, info);
  }
</script>

<DialogRoot {open} {defaultOpen} {fullscreen} onOpenChange={handleOpenChange}>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent>
      <DialogHeader>
        {#if title}<DialogTitle>{#if typeof title === 'function'}{@render title()}{:else}{title}{/if}</DialogTitle>{/if}
        {#if header}{@render header()}{/if}
        {#if fullscreen}<DialogFullscreenToggle />{/if}
        {#if closable}<DialogClose />{/if}
      </DialogHeader>
      <DialogBody>{#if children}{@render children()}{/if}</DialogBody>
      {#if footer !== null}
        <DialogFooter>
          {#if footer}{@render footer()}{:else}<DialogClose>{#if cancelText}{@render cancelText()}{:else}取消{/if}</DialogClose><Button variant="solid" color="primary">{#if okText}{@render okText()}{:else}确定{/if}</Button>{/if}
        </DialogFooter>
      {/if}
    </DialogContent>
  </DialogPortal>
</DialogRoot>
