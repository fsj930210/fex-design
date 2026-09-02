<script lang="ts">
  import type { AlertOptions } from '@fex-design/core/alert/types'
  import { alertClassName } from '@fex-design/styles/alert'
  import { cn } from '@fex/utils'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'>, AlertOptions {
    class?: string
    children?: Snippet
  }

  let { class: className, children, type = 'info', variant = 'filled', ...rest }: Props = $props()
  const classList = $derived(cn(alertClassName({ type, variant }), className))
</script>

<div data-slot="alert" role="alert" {...rest} class={classList}>
  {@render children?.()}
</div>
