<script lang="ts">
  import type {
    ScrollbarRootOptions,
    ScrollbarScrollDetail,
  } from "@fex-design/core/scrollbar/types";
  import { scrollbarRootClassName } from "@fex-design/components-styles/scrollbar";
  import { cn } from "@fex-design/utils";
  import { setContext, type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { createScrollbar } from "./create-scrollbar.svelte";
  import { scrollbarKey, type ScrollbarContext } from "./scrollbar-context";
  interface Props
    extends
      HTMLAttributes<HTMLDivElement>,
      Omit<ScrollbarRootOptions, "onScroll"> {
    children?: Snippet;
    element?: HTMLDivElement | undefined;
    onScrollChange?: (detail: ScrollbarScrollDetail) => void;
  }
  let {
    showTrack = false,
    showCorner,
    children,
    overflow,
    element = $bindable(),
    visibility,
    autoHide,
    autoHideDelay,
    dragScroll,
    clickScroll,
    minThumbSize,
    disabled,
    onScrollChange,
    class: className,
    ...rest
  }: Props = $props();
  const binding = createScrollbar(() => ({
    visibility,
    autoHide,
    autoHideDelay,
    dragScroll,
    clickScroll,
    minThumbSize,
    disabled,
    onScroll: (detail) => onScrollChange?.(detail),
  }));
  setContext<ScrollbarContext>(scrollbarKey, () => overflow);
</script>

<div
  {...rest}
  bind:this={element}
  use:binding.root
  data-slot="scrollbar-root"
  data-show-track={showTrack}
  data-show-corner={showCorner ?? showTrack}
  class={cn(scrollbarRootClassName, className)}
>
  {@render children?.()}
</div>
