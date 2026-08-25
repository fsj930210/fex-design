<script lang="ts">
  import { buttonClassName } from '@fex-design/styles/button'
  import { cn } from '@fex/utils'
  import type { ButtonProps } from './button.types'

  let {
    class: className,
    children,
    ref = $bindable(null),
    type = 'button',
    variant = 'outlined',
    color,
    ...rest
  }: ButtonProps = $props()
  const classList = $derived(cn(buttonClassName({ variant, color }), className))
</script>

<button bind:this={ref} data-slot="button" data-variant={variant} data-color={color} {...rest} class={classList} {type}>
  {@render children?.()}
</button>
