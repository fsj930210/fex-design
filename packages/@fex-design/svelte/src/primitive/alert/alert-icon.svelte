<script lang="ts">
  import { alertIconClassName } from '@fex-design/styles/alert'
  import { cn } from '@fex/utils'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  interface Props extends HTMLAttributes<HTMLSpanElement> { children?: Snippet }
  let { class: className, children, ...rest }: Props = $props()
</script>

<span {...rest} data-slot="alert-icon" class={cn(alertIconClassName, className)}>{@render children?.()}</span>
