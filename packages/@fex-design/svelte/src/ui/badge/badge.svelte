<script lang="ts">
  import PrimitiveBadge from '../../primitive/badge/badge.svelte'
  import Dot from '../../primitive/badge/badge-dot.svelte'
  import { badgeRootClassName } from '@fex-design/styles/badge'
  import { getBadgeOffsetTransform, type BadgeAttachmentOptions, type BadgeClassNames, type BadgeOptions, type BadgeStyles } from '@fex-design/core'
  import { cn } from '@fex/utils'
  import type { Snippet } from 'svelte'

  let { children, count, dot = false, color, showZero = false, overflowCount, offset, class: className, style, classNames, styles }: BadgeOptions & BadgeAttachmentOptions & { children?: Snippet; dot?: boolean; class?: string; style?: string; classNames?: BadgeClassNames; styles?: BadgeStyles<string> } = $props()
  const indicatorStyle = $derived(`${offset ? `translate:none;transform:${getBadgeOffsetTransform(offset)};` : ''}${styles?.indicator ?? ''}`)
  const badgeProps = $derived({ ...(count !== undefined ? { count } : {}), ...(color !== undefined ? { color } : {}), ...(showZero ? { showZero: true } : {}), ...(overflowCount !== undefined ? { overflowCount } : {}), style: indicatorStyle })
</script>

{#if children && (dot || count !== undefined)}
  <span data-slot="badge-root" class={cn(badgeRootClassName, className, classNames?.root)} style={`${style ?? ''}${styles?.root ?? ''}`}>
    <span data-slot="badge-content" class={classNames?.content} style={styles?.content}>{@render children()}</span>
    {#if dot}<Dot color={color} class={classNames?.indicator} style={indicatorStyle} />{:else}<PrimitiveBadge {...badgeProps} class={classNames?.indicator} />{/if}
  </span>
{:else if dot}
  <Dot color={color} class={cn(className, classNames?.indicator)} style={indicatorStyle} />
{:else}
  <PrimitiveBadge {...badgeProps} class={cn(className, classNames?.root)} style={`${style ?? ''}${styles?.root ?? ''}`}>{@render children?.()}</PrimitiveBadge>
{/if}
