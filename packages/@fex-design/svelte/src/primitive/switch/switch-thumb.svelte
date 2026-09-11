<script lang="ts">
  import { switchThumbClassName } from '@fex-design/styles/switch'
  import { cn } from '@fex/utils'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  interface Props extends HTMLAttributes<HTMLSpanElement> {
    ref?: HTMLSpanElement | null | undefined
    children?: Snippet | undefined
  }
  let { class: className, ref = $bindable(null), children, ...rest }: Props = $props()
</script>
<span
  {...rest}
  bind:this={ref}
  aria-hidden="true"
  data-slot="switch-thumb"
  class={cn(switchThumbClassName, className)}
>
  {@render children?.()}
</span>
