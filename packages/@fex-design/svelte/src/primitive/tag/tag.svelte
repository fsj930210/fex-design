<script lang="ts">
  import {
    isTagPresetColor,
    type TagOptions,
    type TagPresetColor,
  } from '@fex-design/core/tag/types'
  import { tagClassName } from '@fex-design/styles/tag'
  import { cn } from '@fex/utils'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'>, TagOptions {
    children?: Snippet
  }

  let {
    class: className,
    style,
    color,
    variant = 'filled',
    size = 'md',
    disabled = false,
    children,
    ...rest
  }: Props = $props()
  const presetColor = $derived<TagPresetColor | undefined>(
    isTagPresetColor(color) ? color : undefined,
  )
  const rootStyle = $derived(
    `${color && !presetColor ? `--tag-color:${color};` : ''}${typeof style === 'string' ? style : ''}`,
  )
</script>

<span
  {...rest}
  data-slot="tag"
  data-color={presetColor ?? (color ? 'custom' : undefined)}
  data-variant={variant}
  data-size={size}
  data-disabled={disabled ? 'true' : undefined}
  class={cn(tagClassName({ variant, color: presetColor, size }), className)}
  style={rootStyle}
>
  {@render children?.()}
</span>
