<script lang="ts">
  import { anchorListClassName } from '@fex-design/styles/anchor'; import { cn } from '@fex/utils'; import { getContext, type Snippet } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { anchorContextKey, type AnchorContextValue } from './context'
  interface Props extends HTMLAttributes<HTMLUListElement> { children?: Snippet }
  let { class: className, children, ...rest }: Props = $props(); const anchor = getContext<AnchorContextValue>(anchorContextKey)
</script>
<ul {...rest} data-slot="anchor-list" class={cn(anchorListClassName({ orientation: anchor.orientation() }), className)}>{@render children?.()}</ul>
