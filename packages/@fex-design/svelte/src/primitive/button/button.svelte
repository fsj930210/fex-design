<script lang="ts">
  import { buttonPrimitiveClassName } from '@fex-design/styles/button'
  import { cn } from '@fex/utils'
  import type { ButtonProps } from './button.types'

  let {
    class: className,
    children,
    ref = $bindable(null),
    type = 'button',
    ...rest
  }: ButtonProps = $props()
  const classList = $derived(cn(buttonPrimitiveClassName, className))
</script>

<button bind:this={ref} data-slot="button" {...rest} class={classList} {type}>
  {@render children?.()}
</button>
