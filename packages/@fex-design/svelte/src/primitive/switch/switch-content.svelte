<script lang="ts">
  import type { SwitchState } from '@fex-design/core/switch/types'
  import { switchContentClassName } from '@fex-design/styles/switch'
  import { cn } from '@fex/utils'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'
  interface Props extends HTMLAttributes<HTMLSpanElement> {
    ref?: HTMLSpanElement | null | undefined
    children?: Snippet | undefined
    state: SwitchState
  }
  let { state, class: className, ref = $bindable(null), children, ...rest }: Props = $props()
</script>
<span {...rest} bind:this={ref} aria-hidden="true" data-slot="switch-content"
  data-state={state} class={cn(switchContentClassName, className)}>
  {@render children?.()}
</span>
