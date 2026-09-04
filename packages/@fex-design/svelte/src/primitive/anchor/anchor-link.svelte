<script lang="ts">
  import { anchorLinkClassName } from '@fex-design/styles/anchor'; import { cn } from '@fex/utils'; import { getContext, type Snippet } from 'svelte'; import type { HTMLButtonAttributes } from 'svelte/elements'; import { anchorContextKey, anchorItemContextKey, type AnchorContextValue } from './context'; import type { AnchorRegisteredItem } from '@fex-design/core/anchor/types'
  interface Props extends HTMLButtonAttributes { children?: Snippet }
  let { class: className, children, onclick, ...rest }: Props = $props(); const anchor = getContext<AnchorContextValue>(anchorContextKey); const item = getContext<AnchorRegisteredItem>(anchorItemContextKey); function click(event: MouseEvent) { onclick?.(event); if (!event.defaultPrevented) anchor.activate(item) }
</script>
<button {...rest} type={rest.type ?? 'button'} data-slot="anchor-link" data-anchor-key={item.key} data-state={anchor.activeKeys().includes(item.key) ? 'active' : 'inactive'} class={cn(anchorLinkClassName({ orientation: anchor.orientation(), active: anchor.highlightedKeys().has(item.key) }), className)} onclick={click}>{@render children?.()}</button>
