<script lang="ts">
  import type { TreeDataNode } from "@fex-design/svelte/primitive/tree";

  import {
    TreeRoot,
    TreeViewport,
    TreeItem,
    TreeTrigger,
    TreeTitle,
    treeDndItemAction,
    dndFeature,
    expansionFeature,
    type TreeDragEventContext,
  } from "@fex-design/svelte/primitive/tree";
  import { treeDndDemoData } from "./_data/tree-demo";
  const options = {
    treeData: treeDndDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ["root-1", "root-1-group-1"],
      }),
      dndFeature<TreeDataNode<string, string>>(),
    ],
  };
  let message = $state(
    "Item 1.1.2 不可拖动；Item 1.1.3 不可放置。其他节点可拖放。",
  );
  const callbacks = {
    onDrop: ({
      sourceItem,
      targetItem,
      intent,
    }: TreeDragEventContext<TreeDataNode<string, string>>) => {
      if (!intent?.valid) return;
      message = `${String(sourceItem?.data.title)} → ${String(targetItem?.data.title)}（${intent.position === "inside" ? "成为子节点" : "排在其后"}）`;
    },
  };
</script>

<div class="w-[min(36rem,100%)] min-w-0">
  <p class="mb-space-sm min-h-10 break-all text-sm text-muted-foreground">
    {message}
  </p>
  <TreeRoot {options}
    ><TreeViewport
      >{#snippet children(item)}<TreeItem
          itemKey={item.key}
          draggable
          dndCallbacks={callbacks}
          >{#snippet children(state)}<div
              {...state.itemProps}
              use:treeDndItemAction={state.dnd}
            >
              <TreeTrigger itemKey={item.key} /><TreeTitle
                >{String(item.data.title)}</TreeTitle
              >
            </div>{/snippet}</TreeItem
        >{/snippet}</TreeViewport
    ></TreeRoot
  >
</div>
