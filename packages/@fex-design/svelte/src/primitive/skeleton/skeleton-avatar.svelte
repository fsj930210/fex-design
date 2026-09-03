<script lang="ts">
  import type { SkeletonAvatarOptions } from '@fex-design/core/skeleton/types'
  import { skeletonAvatarClassName } from '@fex-design/styles/skeleton'
  import { cn } from '@fex/utils'
  import type { HTMLAttributes } from 'svelte/elements'
  import SkeletonBlock from './skeleton-block.svelte'
  let { class: className, shape, size, ...rest }: HTMLAttributes<HTMLDivElement> & SkeletonAvatarOptions = $props()
</script>
<SkeletonBlock {...rest} data-slot="skeleton-avatar" class={cn(skeletonAvatarClassName({ shape, size }), className)} />
