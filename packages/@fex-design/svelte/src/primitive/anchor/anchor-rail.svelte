<script lang="ts">
  import { anchorRailClassName } from '@fex-design/styles/anchor'; import { cn } from '@fex/utils'; import { getContext, type Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { anchorContextKey, type AnchorContextValue } from './context'
  interface Props extends HTMLAttributes<HTMLDivElement> { children?: Snippet }
  let { class: className, children, ...rest }: Props = $props(); const anchor = getContext<AnchorContextValue>(anchorContextKey)
</script>
<div {...rest} aria-hidden="true" data-slot="anchor-rail" class={cn(anchorRailClassName({ orientation: anchor.orientation() }), className)}>{@render children?.()}</div>
