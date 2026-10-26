<script lang="ts">
  import {
    expansionFeature,
    TreeItem,
    TreeRoot,
    TreeTitle,
    TreeTrigger,
    TreeViewport,
  } from "@fex-design/svelte/primitive/tree";
  import { treeDemoData } from "./_data/tree-demo";
  const expanded = ["root-1", "root-1-group-1"];
  const options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<Record<string, unknown>>({
        defaultExpandedKeys: expanded,
      }),
    ],
  };
</script>

<TreeRoot {options} class="w-full max-w-xl rounded-md bg-background p-2"
  ><TreeViewport
    >{#snippet children(item)}<TreeItem itemKey={item.key}
        >{#snippet children(state)}<div {...state.itemProps}>
            <TreeTrigger itemKey={item.key} /><TreeTitle
              >{item.data.title}</TreeTitle
            >
          </div>{/snippet}</TreeItem
      >{/snippet}</TreeViewport
  ></TreeRoot
>
