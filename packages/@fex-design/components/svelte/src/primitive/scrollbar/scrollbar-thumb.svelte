<script lang="ts">
  import type { ScrollbarAxis } from "@fex-design/core/scrollbar/types";
  import { scrollbarThumbClassName } from "@fex-design/components-styles/scrollbar";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from 'svelte';
  interface Props extends HTMLAttributes<HTMLDivElement> {
    axis: ScrollbarAxis;
    children?: Snippet;
    element?: HTMLDivElement | undefined;
  }
  let { axis, children, element = $bindable(), class: className, ...rest }: Props = $props();
</script>

<div
  {...rest}
  bind:this={element}
  data-slot="scrollbar-thumb"
  data-axis={axis}
  class={cn(scrollbarThumbClassName({ axis }), className)}
>
  {@render children?.()}
</div>
