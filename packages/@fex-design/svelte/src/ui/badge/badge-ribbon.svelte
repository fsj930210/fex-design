<script lang="ts">
  import PrimitiveBadgeRibbon from '../../primitive/badge/badge-ribbon.svelte'
  import type { BadgeRibbonOptions } from '@fex-design/core'
  import { badgeRibbonRootClassName } from '@fex-design/styles/badge'
  import { cn } from '@fex/utils'
  import type { Snippet } from 'svelte'

  let { text, color, placement, class: className, children }: BadgeRibbonOptions & { text?: string | Snippet; class?: string; children?: Snippet } = $props()
</script>

<div data-slot="badge-ribbon-root" class={cn(badgeRibbonRootClassName, className)}>
  <div data-slot="badge-ribbon-content">{@render children?.()}</div>
  <PrimitiveBadgeRibbon {...color !== undefined ? { color } : {}} {...placement !== undefined ? { placement } : {}}>{#if typeof text === 'function'}{@render text()}{:else}{text}{/if}</PrimitiveBadgeRibbon>
</div>
