<script lang="ts">
  import type { SkeletonAvatarOptions } from "@fex-design/core/skeleton/types";
  import { skeletonAvatarClassName } from "@fex-design/components-styles/skeleton";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import SkeletonBlock from "./skeleton-block.svelte";
  let {
    class: className,
    shape,
    size,
    ...rest
  }: HTMLAttributes<HTMLDivElement> & SkeletonAvatarOptions = $props();
</script>

<SkeletonBlock
  {...rest}
  data-slot="skeleton-avatar"
  class={cn(skeletonAvatarClassName({ shape, size }), className)}
/>
