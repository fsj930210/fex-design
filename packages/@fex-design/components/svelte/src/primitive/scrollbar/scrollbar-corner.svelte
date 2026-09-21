<script lang="ts">
  import { scrollbarCornerClassName } from "@fex-design/components-styles/scrollbar";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  let { class: className, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
  {...rest}
  data-slot="scrollbar-corner"
  class={cn(scrollbarCornerClassName, className)}
></div>
