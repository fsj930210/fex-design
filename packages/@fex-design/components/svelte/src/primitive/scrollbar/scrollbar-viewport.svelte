<script lang="ts">
  import { scrollbarViewportClassName } from "@fex-design/components-styles/scrollbar";
  import { cn } from "@fex-design/utils";
  import { getContext, type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ScrollbarOverflow } from "@fex-design/core/scrollbar/types";
  import { resolveScrollbarOverflow } from "@fex-design/core/scrollbar/create-scrollbar-controller";
  import { scrollbarKey, type ScrollbarContext } from "./scrollbar-context";
  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
    overflow?: ScrollbarOverflow;
    element?: HTMLDivElement | undefined;
  }
  let {
    children,
    overflow,
    element = $bindable(),
    class: className,
    ...rest
  }: Props = $props();
  const parent = getContext<ScrollbarContext | undefined>(scrollbarKey);
</script>

<div
  {...rest}
  bind:this={element}
  data-slot="scrollbar-viewport"
  class={cn(
    scrollbarViewportClassName({
      overflowX: resolveScrollbarOverflow(overflow, parent?.()).x,
      overflowY: resolveScrollbarOverflow(overflow, parent?.()).y,
    }),
    className,
  )}
>
  {@render children?.()}
</div>
