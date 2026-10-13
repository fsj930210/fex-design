<script lang="ts">
  import type {
    AnchorRegisteredItem,
    AnchorTarget,
  } from "@fex-design/core/anchor/types";
  import { anchorItemClassName } from "@fex-design/components-styles/anchor";
  import { cn } from "@fex-design/utils";
  import { getContext, setContext, type Snippet } from "svelte";
  import type { HTMLLiAttributes } from "svelte/elements";
  import {
    anchorContextKey,
    anchorItemContextKey,
    type AnchorContextValue,
  } from "./context";
  interface Props extends HTMLLiAttributes {
    value: string;
    target: AnchorTarget;
    targetOffset?: number;
    children?: Snippet;
  }
  let {
    value,
    target,
    targetOffset,
    class: className,
    children,
    ...rest
  }: Props = $props();
  const anchor = getContext<AnchorContextValue>(anchorContextKey);
  const parent = getContext<AnchorRegisteredItem | undefined>(
    anchorItemContextKey,
  );
  const item: AnchorRegisteredItem = {
    get key() { return value; },
    get target() { return target; },
    get targetOffset() { return targetOffset; },
    get parentKey() { return parent?.key; },
  };
  setContext(anchorItemContextKey, item);
  // Keep the external registry current; the effect cleans up each previous registration.
  $effect(() => anchor.registerItem({ ...item }));
</script>

<li
  {...rest}
  data-slot="anchor-item"
  data-active={anchor.activeKeys().includes(value) || undefined}
  data-highlighted={anchor.highlightedKeys().has(value) || undefined}
  class={cn(anchorItemClassName, className)}
>
  {@render children?.()}
</li>
