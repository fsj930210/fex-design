<script lang="ts">
  import { anchorIndicatorClassName } from '@fex-design/styles/anchor'; import { cn } from '@fex/utils'; import { getContext } from 'svelte'; import type { HTMLAttributes } from 'svelte/elements'; import { anchorContextKey, type AnchorContextValue } from './context'
  interface Props extends HTMLAttributes<HTMLSpanElement> {}
  let { class: className, style, ...rest }: Props = $props(); const anchor = getContext<AnchorContextValue>(anchorContextKey)
</script>
{#each anchor.inkStyles() as inkStyle}<span {...rest} data-slot="anchor-indicator" class={cn(anchorIndicatorClassName({ orientation: anchor.orientation() }), className)} style={`${style ?? ''};${inkStyle.top === undefined ? '' : `top:${inkStyle.top}px;`}${inkStyle.left === undefined ? '' : `left:${inkStyle.left}px;`}${inkStyle.width === undefined ? '' : `width:${inkStyle.width}px;`}${inkStyle.height === undefined ? '' : `height:${inkStyle.height}px;`}`}></span>{/each}
