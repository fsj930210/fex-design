<script lang="ts" generics="T">
  import type { BadgeGroupOptions } from '@fex-design/core'
  import { splitOverflowItems } from '@fex-design/core/collection/split-overflow-items'
  import { badgeClassName, badgeGroupClassName } from '@fex-design/styles/badge'
  import { cn } from '@fex/utils'
  import type { Snippet } from 'svelte'
  interface Props extends BadgeGroupOptions { items: readonly T[]; class?: string; item: Snippet<[T]>; overflow?: Snippet<[number, readonly T[]]> }
  let { items, maxCount, class: className, item, overflow }: Props = $props()
  const split = $derived(splitOverflowItems(items, maxCount))
</script>
<div data-slot="badge-group" class={cn(badgeGroupClassName, className)}>{#each split.visibleItems as entry, index (index)}{@render item(entry)}{/each}{#if split.overflowCount}{#if overflow}{@render overflow(split.overflowCount, split.overflowItems)}{:else}<span data-slot="badge" class={badgeClassName()}>+{split.overflowCount}</span>{/if}{/if}</div>
