<script lang="ts">
  import type { SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
  import { skeletonImageClassName } from '@fex-design/styles/skeleton'
  import { cn } from '@fex/utils'
  import type { HTMLAttributes } from 'svelte/elements'
  import SkeletonBlock from './skeleton-block.svelte'
  let { class: className, ...rest }: HTMLAttributes<HTMLDivElement> & SkeletonVisualOptions = $props()
</script>
<SkeletonBlock {...rest} data-slot="skeleton-image" class={cn(skeletonImageClassName, className)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M4 5h16v14H4z" /><circle cx="9" cy="10" r="2" /><path d="m4 17 4-4 3 3 2-2 7 5" /></svg></SkeletonBlock>
