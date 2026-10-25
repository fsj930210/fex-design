<script lang="ts" generics="TNode extends TreeNodeData">
  import type {
    TreeController,
    TreeKey,
    TreeNodeData,
    TreeVisibleItem,
  } from "@fex-design/core/tree/types";
  import { treeViewportClassName } from "@fex-design/components-styles/tree";
  import { cn } from "@fex-design/utils";
  import { getContext, type Snippet, untrack, tick } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { readableCoreStore } from "@fex-design/svelte/stores/core-store";
  import { treeContextKey, type TreeContext } from "./tree-context";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    controller?: TreeController<TNode>;
    children?: Snippet<[TreeVisibleItem<TNode>]>;
  }

  let { controller, children, class: className, ...rest }: Props = $props();
  const context = getContext<TreeContext<TNode>>(treeContextKey);
  const tree = untrack(() => controller ?? context.tree);
  const items = readableCoreStore({
    getSnapshot: tree.getVisibleItems,
    subscribe: tree.subscribeVisible,
  });
  let element: HTMLDivElement;
  export function scrollTo(
    key: TreeKey,
    options?: { reveal?: boolean; align?: "auto" | "start" | "center" | "end" },
  ) {
    if (options?.reveal && !tree.getFeature("focus")?.reveal(key)) return false;
    if (options?.reveal) {
      void tick().then(() => scrollTo(key, { ...options, reveal: false }));
      return true;
    }
    const item = Array.from(
      element?.querySelectorAll<HTMLElement>("[data-key]") ?? [],
    ).find((node) => node.dataset.key === String(key));
    if (!item) return false;
    item.scrollIntoView({
      block:
        options?.align === "auto" ? "nearest" : (options?.align ?? "nearest"),
    });
    return true;
  }
</script>

<div
  {...rest}
  bind:this={element}
  data-slot="tree-viewport"
  class={cn(treeViewportClassName, className)}
>
  {#each $items as item (item.key)}
    {@render children?.(item)}
  {/each}
</div>
