<script lang="ts">
  import type { TreeDataNode } from "@fex-design/svelte/ui/tree";

  import { Tree, type TreeInstance } from "@fex-design/svelte/ui/tree";
  import { Button } from "@fex-design/svelte/ui/button";
  import { treeDemoData } from "./_data/tree-demo";
  let tree = $state<TreeInstance<TreeDataNode<string, string>>>();
  let message = $state("");
  function locate() {
    const found = tree?.scrollTo("root-2-group-3-item-3", { reveal: true });
    message = found ? "已定位 Item 2.3.3" : "未能定位目标节点";
  }
</script>

<div class="grid w-full gap-space-sm">
  <Button class="w-full" onclick={locate}>Scroll to Item 2.3.3</Button>
  <Tree
    bind:this={tree}
    treeData={treeDemoData}
    classNames={{ viewport: "h-48 overflow-y-auto" }}
  />
  <output class="min-h-5 text-xs text-muted-foreground" aria-live="polite"
    >{message}</output
  >
</div>
