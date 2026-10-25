<script lang="ts" generics="TNode extends Record<string, unknown>">
  import type { TreeBehaviorProps } from "./tree-types";
  import { createTreeSetup } from "./tree-setup";
  import {
    createTreeInstance,
    type TreeInstance,
    type TreeViewportInstance,
  } from "./tree-instance";
  import { createTreeStore } from "@fex-design/svelte/primitive/tree";
  import { cn } from "@fex-design/utils";
  import { untrack } from "svelte";
  import type {
    TreeController,
    TreeVisibleItem,
  } from "@fex-design/svelte/primitive/tree";
  import {
    TreeCheckbox,
    TreeItem,
    TreeRoot,
    TreeTitle,
    TreeTrigger,
    TreeViewport,
    TreeVirtualViewport,
  } from "@fex-design/svelte/primitive/tree";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { treeDndItemAction } from "@fex-design/svelte/primitive/tree";
  import { Spinner } from "@fex-design/svelte/ui/spinner";
  interface Props
    extends
      Omit<HTMLAttributes<HTMLDivElement>, "children">,
      TreeBehaviorProps<TNode> {
    virtual?: boolean;
    virtualHeight?: number;
    virtualOverscan?: number;
    checkable?: boolean;
    block?: boolean;
    draggable?: boolean;
    classNames?: Partial<
      Record<
        | "root"
        | "viewport"
        | "item"
        | "trigger"
        | "checkbox"
        | "title"
        | "dropIndicator",
        string
      >
    >;
    styles?: Partial<
      Record<
        | "root"
        | "viewport"
        | "item"
        | "trigger"
        | "checkbox"
        | "title"
        | "dropIndicator",
        string
      >
    >;
    renderItem?: Snippet<[TreeVisibleItem<TNode>, TreeController<TNode>]>;
    onItemClick?: (event: MouseEvent, item: TreeVisibleItem<TNode>) => void;
    onItemDoubleClick?: (
      event: MouseEvent,
      item: TreeVisibleItem<TNode>,
    ) => void;
    onItemContextMenu?: (
      event: MouseEvent,
      item: TreeVisibleItem<TNode>,
    ) => void;
  }
  let {
    treeData,
    disabled,
    selectable,
    disableCheckbox,
    droppable,
    fieldNames,
    isLeaf,
    expandedKeys,
    defaultExpandedKeys,
    onExpand,
    selectedKeys,
    defaultSelectedKeys,
    multiple,
    onSelect,
    checkedKeys,
    defaultCheckedKeys,
    checkStrict = false,
    onCheck,
    loadChildren,
    onLoadError,
    indent = 16,
    rowHeight = 32,
    virtual = false,
    virtualHeight = 320,
    virtualOverscan = 6,
    checkable = false,
    block = false,
    draggable = false,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    classNames,
    styles,
    renderItem,
    onItemClick,
    onItemDoubleClick,
    onItemContextMenu,
    class: className,
    style,
    ...rest
  }: Props = $props();
  const dndCallbacks = $derived({
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
  });
  let viewport = $state<TreeViewportInstance>();
  const setup = createTreeSetup<TNode>();
  const treeOptions = $derived(
    setup({
      disabled,
      selectable,
      checkable,
      disableCheckbox,
      draggable,
      droppable,
      treeData,
      fieldNames,
      isLeaf,
      expandedKeys,
      defaultExpandedKeys,
      onExpand,
      selectedKeys,
      defaultSelectedKeys,
      multiple,
      onSelect,
      checkedKeys,
      defaultCheckedKeys,
      checkStrict,
      onCheck,
      loadChildren,
      onLoadError,
      indent,
      rowHeight,
    }),
  );
  const { tree } = untrack(() => createTreeStore(treeOptions));
  // Synchronize Svelte inputs with the existing external tree controller; no business flow is watched.
  $effect(() => {
    tree.updateOptions(treeOptions);
  });
  const instance = createTreeInstance(
    () => tree,
    () => viewport,
  );
  export function scrollTo(
    ...args: Parameters<TreeInstance<TNode>["scrollTo"]>
  ) {
    return instance.scrollTo(...args);
  }
  export function expand(...args: Parameters<TreeInstance<TNode>["expand"]>) {
    return instance.expand(...args);
  }
  export function collapse(
    ...args: Parameters<TreeInstance<TNode>["collapse"]>
  ) {
    return instance.collapse(...args);
  }
  export function expandAll(
    ...args: Parameters<TreeInstance<TNode>["expandAll"]>
  ) {
    return instance.expandAll(...args);
  }
  export function collapseAll(
    ...args: Parameters<TreeInstance<TNode>["collapseAll"]>
  ) {
    return instance.collapseAll(...args);
  }
  export function select(...args: Parameters<TreeInstance<TNode>["select"]>) {
    return instance.select(...args);
  }
  export function unselect(
    ...args: Parameters<TreeInstance<TNode>["unselect"]>
  ) {
    return instance.unselect(...args);
  }
  export function clearSelection(
    ...args: Parameters<TreeInstance<TNode>["clearSelection"]>
  ) {
    return instance.clearSelection(...args);
  }
  export function check(...args: Parameters<TreeInstance<TNode>["check"]>) {
    return instance.check(...args);
  }
  export function uncheck(...args: Parameters<TreeInstance<TNode>["uncheck"]>) {
    return instance.uncheck(...args);
  }
  export function clearChecked(
    ...args: Parameters<TreeInstance<TNode>["clearChecked"]>
  ) {
    return instance.clearChecked(...args);
  }
  export function getNode(...args: Parameters<TreeInstance<TNode>["getNode"]>) {
    return instance.getNode(...args);
  }
  export function getPath(...args: Parameters<TreeInstance<TNode>["getPath"]>) {
    return instance.getPath(...args);
  }
  export function getTreeData(
    ...args: Parameters<TreeInstance<TNode>["getTreeData"]>
  ) {
    return instance.getTreeData(...args);
  }
  export function updateNode(
    ...args: Parameters<TreeInstance<TNode>["updateNode"]>
  ) {
    return instance.updateNode(...args);
  }
  export function insertNode(
    ...args: Parameters<TreeInstance<TNode>["insertNode"]>
  ) {
    return instance.insertNode(...args);
  }
  export function removeNode(
    ...args: Parameters<TreeInstance<TNode>["removeNode"]>
  ) {
    return instance.removeNode(...args);
  }
  export function moveNode(
    ...args: Parameters<TreeInstance<TNode>["moveNode"]>
  ) {
    return instance.moveNode(...args);
  }
  export function replaceChildren(
    ...args: Parameters<TreeInstance<TNode>["replaceChildren"]>
  ) {
    return instance.replaceChildren(...args);
  }
</script>

<TreeRoot
  {...rest}
  class={cn(className, classNames?.root)}
  style={[style, styles?.root].filter(Boolean).join(";")}
  controller={tree}
  aria-disabled={disabled || undefined}
  {indent}
  {rowHeight}
>
  {#if virtual}
    <TreeVirtualViewport
      bind:this={viewport}
      class={classNames?.viewport}
      style={styles?.viewport}
      height={virtualHeight}
      overscan={virtualOverscan}
    >
      {#snippet children(item)}<TreeItem
          class={classNames?.item}
          style={styles?.item}
          itemKey={item.key}
          {block}
          {dndCallbacks}
        >
          {#snippet children(state)}<div
              {...state.itemProps}
              use:treeDndItemAction={state.dnd}
              onclick={(event) => {
                state.itemProps.onclick?.(event);
                onItemClick?.(event, item);
              }}
              ondblclick={(event) => onItemDoubleClick?.(event, item)}
              oncontextmenu={(event) => onItemContextMenu?.(event, item)}
            >
              {#if renderItem}{@render renderItem(
                  item,
                  state.dnd.tree,
                )}{:else}{#if state.loadState === "loading"}<Spinner
                    size="sm"
                    aria-label="Loading children"
                  />{:else}<TreeTrigger
                    class={classNames?.trigger}
                    style={styles?.trigger}
                    itemKey={state.item.key}
                  />{/if}{#if state.item.checkable}<TreeCheckbox
                    class={classNames?.checkbox}
                    style={styles?.checkbox}
                    itemKey={state.item.key}
                  />{/if}<TreeTitle
                  class={classNames?.title}
                  style={styles?.title}>{String(state.item.title)}</TreeTitle
                >{/if}
            </div>{/snippet}
        </TreeItem>{/snippet}
    </TreeVirtualViewport>
  {:else}
    <TreeViewport
      bind:this={viewport}
      class={classNames?.viewport}
      style={styles?.viewport}
    >
      {#snippet children(item)}<TreeItem
          class={classNames?.item}
          style={styles?.item}
          itemKey={item.key}
          {block}
          {draggable}
          {dndCallbacks}
        >
          {#snippet children(state)}<div
              {...state.itemProps}
              use:treeDndItemAction={state.dnd}
              onclick={(event) => {
                state.itemProps.onclick?.(event);
                onItemClick?.(event, item);
              }}
              ondblclick={(event) => onItemDoubleClick?.(event, item)}
              oncontextmenu={(event) => onItemContextMenu?.(event, item)}
            >
              {#if renderItem}{@render renderItem(
                  item,
                  state.dnd.tree,
                )}{:else}{#if state.loadState === "loading"}<Spinner
                    size="sm"
                    aria-label="Loading children"
                  />{:else}<TreeTrigger
                    class={classNames?.trigger}
                    style={styles?.trigger}
                    itemKey={state.item.key}
                  />{/if}{#if checkable}<TreeCheckbox
                    class={classNames?.checkbox}
                    style={styles?.checkbox}
                    itemKey={state.item.key}
                  />{/if}<TreeTitle
                  class={classNames?.title}
                  style={styles?.title}>{String(state.item.title)}</TreeTitle
                >{/if}
            </div>{/snippet}
        </TreeItem>{/snippet}
    </TreeViewport>
  {/if}
</TreeRoot>
