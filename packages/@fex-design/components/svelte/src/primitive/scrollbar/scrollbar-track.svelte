<script lang="ts">
  import type { ScrollbarAxis } from "@fex-design/core/scrollbar/types";
  import { scrollbarTrackClassName } from "@fex-design/components-styles/scrollbar";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  interface Props extends HTMLAttributes<HTMLDivElement> {
    axis: ScrollbarAxis;
    children?: Snippet;
  }
  let { axis: _axis, children, class: className, ...rest }: Props = $props();
</script>

<div
  {...rest}
  data-slot="scrollbar-track"
  class={cn(scrollbarTrackClassName, className)}
>
  {@render children?.()}
</div>
