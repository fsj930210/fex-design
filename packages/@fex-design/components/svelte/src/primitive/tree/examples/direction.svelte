<script lang="ts">
  import type { TreeDataNode } from "@fex-design/svelte/primitive/tree";

  import {
    TreeRoot,
    TreeViewport,
    TreeItem,
    TreeTrigger,
    TreeTitle,
    expansionFeature,
  } from "@fex-design/svelte/primitive/tree";
  import { treeDemoData } from "./_data/tree-demo";
  const options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ["root-1", "root-1-group-1"],
      }),
    ],
  };
  const directions = ["ltr", "rtl"] as const;
</script>

<div class="grid w-full gap-space-lg">
  {#each directions as direction (direction)}<section class="grid gap-space-sm">
      <h3 class="font-medium">
        {direction === "ltr" ? "LTR · 从左向右" : "RTL · 从右向左"}
      </h3>
      <div dir={direction} class="h-64 overflow-y-auto">
        <TreeRoot {options}
          ><TreeViewport
            >{#snippet children(item)}<TreeItem itemKey={item.key}
                >{#snippet children(state)}<div {...state.itemProps}>
                    <TreeTrigger itemKey={item.key} /><TreeTitle
                      >{String(item.data.title)}</TreeTitle
                    >
                  </div>{/snippet}</TreeItem
              >{/snippet}</TreeViewport
          ></TreeRoot
        >
      </div>
    </section>{/each}
</div>
