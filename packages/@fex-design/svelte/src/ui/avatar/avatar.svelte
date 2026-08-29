<script lang="ts">
  import PrimitiveAvatar from '../../primitive/avatar/avatar.svelte'
  import AvatarImage from '../../primitive/avatar/avatar-image.svelte'
  import AvatarFallback from '../../primitive/avatar/avatar-fallback.svelte'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { AvatarClassNames, AvatarStyles } from '@fex-design/core/avatar/types'
  import { cn } from '@fex/utils'
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> { src?: string; alt?: string; srcset?: string; fallback?: Snippet; children?: Snippet; size?: 'sm' | 'md' | 'lg'; shape?: 'circle' | 'square'; classNames?: AvatarClassNames; styles?: AvatarStyles<string> }
  let { src, alt = '', srcset, fallback, children, class: className, style, classNames, styles, ...rest }: Props = $props()
</script>
<PrimitiveAvatar {...rest} class={cn(className, classNames?.root)} style={[style, styles?.root].filter(Boolean).join(';')}>
  {#if src}<AvatarImage {src} {alt} {srcset} class={classNames?.image} style={styles?.image} />{/if}
  <AvatarFallback class={classNames?.fallback} style={styles?.fallback}>{@render (fallback ?? children)?.()}</AvatarFallback>
</PrimitiveAvatar>
