<script lang="ts">
  import type { SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
  import { skeletonInputBlockClassName, skeletonInputClassName } from '@fex-design/styles/skeleton'
  import { cn } from '@fex/utils'
  import type { HTMLAttributes } from 'svelte/elements'
  import SkeletonBlock from './skeleton-block.svelte'
  let { block, class: className, ...rest }: HTMLAttributes<HTMLDivElement> & SkeletonVisualOptions & { block?: boolean } = $props()
</script>
<SkeletonBlock {...rest} data-slot="skeleton-input" class={cn(skeletonInputClassName, block && skeletonInputBlockClassName, className)} />
