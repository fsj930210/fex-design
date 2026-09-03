<script lang="ts">
  import type { SkeletonButtonShape, SkeletonButtonSize, SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
  import { skeletonButtonClassName } from '@fex-design/styles/skeleton'
  import { cn } from '@fex/utils'
  import type { HTMLAttributes } from 'svelte/elements'
  import SkeletonBlock from './skeleton-block.svelte'
  let { block, class: className, shape, size, ...rest }: HTMLAttributes<HTMLDivElement> & SkeletonVisualOptions & { block?: boolean; shape?: SkeletonButtonShape; size?: SkeletonButtonSize } = $props()
</script>
<SkeletonBlock {...rest} data-slot="skeleton-button" class={cn(skeletonButtonClassName({ block, shape, size }), className)} />
