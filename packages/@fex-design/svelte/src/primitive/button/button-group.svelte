<script lang="ts">
  import { buttonGroupClassName } from '@fex-design/styles/button'
  import { cn } from '@fex/utils'
  import type { ButtonGroupProps } from './button.types'
  let { class: className, style, spacing = 0, orientation = 'horizontal', children, ...rest }: ButtonGroupProps = $props()
  const gap = $derived(typeof spacing === 'number' ? `${spacing}px` : spacing)
</script>

<div
  {...rest}
  role="group"
  data-slot="button-group"
  data-orientation={orientation}
  class={cn(buttonGroupClassName({ orientation, connected: spacing === 0 }), className)}
  {style}
  style:gap={gap}
>
  {@render children?.()}
</div>
