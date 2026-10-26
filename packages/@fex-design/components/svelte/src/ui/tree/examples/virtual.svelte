<script lang="ts">
  import type { TreeInstance } from "@fex-design/svelte/ui/tree";

  import { Tree } from "@fex-design/svelte/ui/tree";
  import { Button } from "@fex-design/svelte/ui/button";
  import {
    virtualTreeDemoData,
    virtualTreeExpandedKeys,
    virtualTreeTargetKey,
    virtualTreeNodeCount,
  } from "./_data/tree-virtual-demo";
  const treeProps = {
    treeData: virtualTreeDemoData,
    defaultExpandedKeys: virtualTreeExpandedKeys,
  };
  let viewport: TreeInstance<Record<string, unknown>> | undefined;
</script>

<section class="grid w-full gap-space-sm">
  <p class="text-sm text-muted-foreground">
    共 {virtualTreeNodeCount} 个节点，240px 高度，仅渲染可视区域附近的行。
  </p>
  <Button
    onclick={() => viewport?.scrollTo(virtualTreeTargetKey, { reveal: true })}
    >定位 Item 80.4.8</Button
  ><Tree bind:this={viewport} {...treeProps} virtual virtualHeight={240} />
</section>
