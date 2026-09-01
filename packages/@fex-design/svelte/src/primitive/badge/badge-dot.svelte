<script lang="ts">
  import { isBadgePresetColor, type BadgeDotOptions } from '@fex-design/core'
  import { badgeDotClassName, badgeDotColorClassName } from '@fex-design/styles/badge'
  import { cn } from '@fex/utils'
  import type { HTMLAttributes } from 'svelte/elements'

  type BadgeDotProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'size'> & BadgeDotOptions

  let {
    class: className,
    color,
    size = 'md',
    style,
    ...rest
  }: BadgeDotProps = $props()
  const presetColor = $derived(isBadgePresetColor(color) ? color : undefined)
  const customColor = $derived(color && !presetColor ? color : undefined)
  const mergedStyle = $derived(
    [style, customColor ? `--badge-color:${customColor}` : ''].filter(Boolean).join(';'),
  )
</script>

<span
  {...rest}
  data-slot="badge-dot"
  data-color={color ?? 'default'}
  data-size={size}
  class={cn(
    badgeDotClassName({ size }),
    badgeDotColorClassName({ color: presetColor }),
    className,
  )}
  style={mergedStyle || undefined}
></span>
