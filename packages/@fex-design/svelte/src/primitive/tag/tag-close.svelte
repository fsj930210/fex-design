<script lang="ts">
  import { tagCloseClassName } from '@fex-design/styles/tag'
  import { cn } from '@fex/utils'
  import type { Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import CloseIcon from '../../icon/close.svelte'

  interface Props extends HTMLButtonAttributes {
    children?: Snippet
  }

  let {
    class: className,
    type = 'button',
    'aria-label': ariaLabel = 'Close',
    children,
    ...rest
  }: Props = $props()
</script>

<button
  {...rest}
  {type}
  aria-label={ariaLabel}
  data-slot="tag-close"
  class={cn(tagCloseClassName, className)}
>
  {#if children}
    {@render children()}
  {:else}
    <CloseIcon aria-hidden="true" />
  {/if}
</button>
