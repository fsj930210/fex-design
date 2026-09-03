<script lang="ts">
  import type { SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
  import { skeletonAnimationVariants, skeletonBaseClassName, skeletonBlockClassName } from '@fex-design/styles/skeleton'
  import { cn } from '@fex/utils'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  let { animation, class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> & SkeletonVisualOptions & { children?: Snippet } = $props()
</script>
<div {...rest} aria-hidden="true" data-slot="skeleton-block" class={cn(skeletonBaseClassName, skeletonBlockClassName, skeletonAnimationVariants({ animation }), className)}>{@render children?.()}</div>
