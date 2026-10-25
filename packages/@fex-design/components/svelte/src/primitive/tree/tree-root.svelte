<script lang="ts" generics="TNode extends TreeNodeData">
  import {
    handleTreeKeyboard,
    focusTreeEntry,
  } from "@fex-design/core/tree/keyboard-dom";
  import type { SelectionFeatureApi } from "@fex-design/core/tree/features/selection";
  import { createTreeController } from "@fex-design/core/tree/create-tree-controller";
  import type {
    TreeController,
    TreeNodeData,
    TreeOptions,
  } from "@fex-design/core/tree/types";
  import { treeRootClassName } from "@fex-design/components-styles/tree";
  import { cn } from "@fex-design/utils";
  import { setContext, type Snippet, untrack } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { treeContextKey, type TreeContext } from "./tree-context";

  interface Props<TNode extends TreeNodeData> extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "children"
  > {
    controller?: TreeController<TNode>;
    options?: TreeOptions<TNode>;
    indent?: number;
    rowHeight?: number;
    children?: Snippet<[TreeController<TNode>]>;
  }

  let {
    controller: externalController,
    options,
    indent = 16,
    rowHeight = 32,
    children,
    class: className,
    style,
    onkeydown,
    onfocus,
    ...rest
  }: Props<TNode> = $props();

  const tree = untrack(
    () =>
      externalController ?? createTreeController(options ?? { treeData: [] }),
  );

  // This effect only synchronizes component inputs to the external core controller.
  // User interactions call controller actions directly instead of watching state changes.
  $effect(() => {
    if (options) tree.updateOptions(options);
  });

  setContext<TreeContext<TNode>>(treeContextKey, {
    tree,
    indent: () => indent,
    rowHeight: () => rowHeight,
  });

  const selection = () => tree.getFeature<SelectionFeatureApi>("selection");

  function keydown(
    event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement },
  ) {
    onkeydown?.(event);
    handleTreeKeyboard(tree, event.currentTarget, event);
  }
  function focus(
    event: FocusEvent & { currentTarget: EventTarget & HTMLDivElement },
  ) {
    onfocus?.(event);
    if (!event.defaultPrevented)
      focusTreeEntry(
        tree,
        event.currentTarget,
        event.target,
        event.relatedTarget,
      );
  }
</script>

<div
  {...rest}
  aria-disabled={options?.disabled || rest["aria-disabled"]}
  role="tree"
  data-slot="tree"
  tabindex="0"
  aria-multiselectable={selection()?.isMultiple() || undefined}
  class={cn(treeRootClassName, className)}
  {style}
  onkeydown={keydown}
  onfocus={focus}
>
  {@render children?.(tree)}
</div>
