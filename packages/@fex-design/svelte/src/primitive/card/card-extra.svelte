<script lang="ts">
  import { cardExtraClassName } from '@fex-design/styles/card'
  import { cn } from '@fex/utils'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  interface CardExtraProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    class?: string
    children?: Snippet
  }

  let { class: className, children, ...rest }: CardExtraProps = $props()
  const classList = $derived(cn(cardExtraClassName, className))
</script>

<div {...rest} data-slot="card-extra" class={classList}>
  {@render children?.()}
</div>
