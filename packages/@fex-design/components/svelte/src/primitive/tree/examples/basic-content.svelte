<script lang="ts">
  import type { TreeDataNode } from "@fex-design/svelte/primitive/tree";

  import { expansionFeature } from "@fex-design/svelte/primitive/tree";
  import {
    TreeItem,
    TreeRoot,
    TreeTitle,
    TreeTrigger,
    TreeViewport,
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
</script>

<TreeRoot {options} class="w-full max-w-xl rounded-md bg-background p-2"
  ><TreeViewport
    >{#snippet children(item)}<TreeItem itemKey={item.key}
        >{#snippet children(state)}<div {...state.itemProps}>
            <TreeTrigger itemKey={state.item.key} /><TreeTitle
              >{state.item.data.title}</TreeTitle
            >
          </div>{/snippet}</TreeItem
      >{/snippet}</TreeViewport
  ></TreeRoot
>
