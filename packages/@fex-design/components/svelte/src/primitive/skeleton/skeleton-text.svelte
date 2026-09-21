<script lang="ts">
  import type { SkeletonVisualOptions } from "@fex-design/core/skeleton/types";
  import { skeletonTextClassName } from "@fex-design/components-styles/skeleton";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import SkeletonBlock from "./skeleton-block.svelte";
  let {
    class: className,
    round,
    ...rest
  }: HTMLAttributes<HTMLDivElement> &
    SkeletonVisualOptions & { round?: boolean } = $props();
</script>

<SkeletonBlock
  {...rest}
  data-slot="skeleton-text"
  class={cn(skeletonTextClassName, round && "rounded-full", className)}
/>
