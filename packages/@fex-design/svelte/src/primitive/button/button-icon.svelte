<script lang="ts">
  import { buttonIconClassName } from '@fex-design/styles/button'
  import { cn } from '@fex/utils'
  import type { ButtonIconProps } from './button.types'

  let {
    class: className,
    children,
    effect,
    placement = 'start',
    ref = $bindable(null),
    'data-icon': dataIcon,
    ...rest
  }: ButtonIconProps = $props()
</script>

<span
  bind:this={ref}
  {...rest}
  class={cn(buttonIconClassName({ placement, effect }), className)}
  data-icon={dataIcon ?? `inline-${placement}`}
>
  {@render children?.()}
</span>
