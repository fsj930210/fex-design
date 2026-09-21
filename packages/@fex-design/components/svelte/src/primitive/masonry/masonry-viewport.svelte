<script lang="ts">
  import { masonryViewportClassName } from "@fex-design/components-styles/masonry";
  import { cn } from "@fex-design/utils";
  import { getContext, type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { readableCoreStore } from '@fex-design/svelte/stores/core-store';
  import { masonryContextKey, type MasonryContext } from "./context";
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    children?: Snippet;
  }
  let { children, class: className, style, ...rest }: Props = $props();
  const { controller } = getContext<MasonryContext>(masonryContextKey),
    snapshot = readableCoreStore(controller);
</script>

<div
  {...rest}
  data-slot="masonry-viewport"
  class={cn(masonryViewportClassName, className)}
  style:height={`${$snapshot.height}px`}
  {style}
>
  {@render children?.()}
</div>
