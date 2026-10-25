<script lang="ts">
  import {
    TreeRoot,
    TreeViewport,
    TreeItem,
    TreeTrigger,
    TreeTitle,
    expansionFeature,
    focusFeature,
    type TreeDataNode,
  } from "@fex-design/svelte/primitive/tree";
  import { Button } from "@fex-design/svelte/primitive/button";
  import { treeDemoData } from "./_data/tree-demo";
  let viewport:
    | { scrollTo(key: string, options: { reveal: boolean }): boolean }
    | undefined;
  let message = $state("");
  const options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>(),
      focusFeature<TreeDataNode<string, string>>(),
    ],
  };
  function locate() {
    const found = viewport?.scrollTo("root-2-group-3-item-3", { reveal: true });
    message = found ? "已定位 Item 2.3.3" : "未能定位目标节点";
  }
</script>

<div class="grid w-full gap-space-sm">
  <Button class="w-full" onclick={locate}>Scroll to Item 2.3.3</Button>
  <TreeRoot {options}
    ><TreeViewport bind:this={viewport} class="h-48 overflow-y-auto">
      {#snippet children(item)}<TreeItem itemKey={item.key}
          >{#snippet children(state)}<div {...state.itemProps}>
              <TreeTrigger itemKey={item.key} /><TreeTitle
                >{String(item.title)}</TreeTitle
              >
            </div>{/snippet}</TreeItem
        >{/snippet}
    </TreeViewport></TreeRoot
  >
  <output class="min-h-5 text-xs text-muted-foreground" aria-live="polite"
    >{message}</output
  >
</div>
