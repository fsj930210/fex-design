<script lang="ts">
  import type { PopoverPortalOptions } from '@fex-design/core/popover/types'
  import type { Snippet } from "svelte";
  import { getContext } from "svelte";
  import { popoverContextKey, type PopoverContext } from "./popover-context";

  interface PopoverPortalProps extends PopoverPortalOptions {
    children?: Snippet;
  }

  let { children, container }: PopoverPortalProps = $props();
  const { overlay, snapshot } = getContext<PopoverContext>(popoverContextKey);

  function portalAction(element: HTMLDivElement, targetContainer: HTMLElement | null | undefined) {
    function move(nextContainer: HTMLElement | null | undefined) {
      const target = nextContainer ?? overlay.resolvePopupContainer();
      if (target && element.parentNode !== target) target.appendChild(element);
    }
    move(targetContainer);
    return {
      update: move,
      destroy() {
        element.remove();
      },
    };
  }
</script>

{#if $snapshot.mounted}
  <div use:portalAction={container ?? $snapshot.popupContainer} data-slot="popover-portal" style="display: contents">
    {@render children?.()}
  </div>
{/if}
