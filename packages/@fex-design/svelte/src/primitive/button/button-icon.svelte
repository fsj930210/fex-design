<script lang="ts">
  import { buttonIconClassName } from '@fex-design/styles/button'
  import { cn } from '@fex/utils'
  import type { ButtonIconProps } from './button.types'

  let {
    class: className,
    children,
    placement = 'start',
    'data-icon': dataIcon,
    ref = $bindable(null),
    ...rest
  }: ButtonIconProps = $props()
</script>

<span
  bind:this={ref}
  {...rest}
  class={cn(buttonIconClassName(), className)}
  data-icon={dataIcon ?? (placement === 'end' ? 'inline-end' : 'inline-start')}
>
  {@render children?.()}
</span>
