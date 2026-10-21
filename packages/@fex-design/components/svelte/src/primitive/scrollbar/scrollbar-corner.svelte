<script lang="ts">
  import { scrollbarCornerClassName } from "@fex-design/components-styles/scrollbar";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
    element?: HTMLDivElement | undefined;
  }
  let {
    children,
    element = $bindable(),
    class: className,
    ...rest
  }: Props = $props();
</script>

<div
  {...rest}
  bind:this={element}
  data-slot="scrollbar-corner"
  class={cn(scrollbarCornerClassName, className)}
>
  {@render children?.()}
</div>
