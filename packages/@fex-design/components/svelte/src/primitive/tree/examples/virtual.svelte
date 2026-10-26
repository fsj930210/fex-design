<script lang="ts">
  import {
    TreeRoot,
    TreeVirtualViewport,
    TreeItem,
    TreeTrigger,
    TreeTitle,
    expansionFeature,
    focusFeature,
  } from "@fex-design/svelte/primitive/tree";
  import { Button } from "@fex-design/svelte/primitive/button";
  import {
    virtualTreeDemoData,
    virtualTreeExpandedKeys,
    virtualTreeTargetKey,
    virtualTreeNodeCount,
  } from "./_data/tree-virtual-demo";
  const options = {
    treeData: virtualTreeDemoData,
    defaultExpandedKeys: virtualTreeExpandedKeys,
    features: [
      expansionFeature<Record<string, unknown>>(),
      focusFeature<Record<string, unknown>>(),
    ],
  };
  let viewport:
    | { scrollTo(key: string, options?: { reveal?: boolean }): boolean }
    | undefined;
</script>

<section class="grid w-full gap-space-sm">
  <p class="text-sm text-muted-foreground">
    共 {virtualTreeNodeCount} 个节点，240px 高度，仅渲染可视区域附近的行。
  </p>
  <Button
    onclick={() => viewport?.scrollTo(virtualTreeTargetKey, { reveal: true })}
    >定位 Item 80.4.8</Button
  ><TreeRoot {options}
    ><TreeVirtualViewport bind:this={viewport} height={240}
      >{#snippet children(item)}<TreeItem itemKey={item.key}
          >{#snippet children(state)}<div {...state.itemProps}>
              <TreeTrigger itemKey={item.key} /><TreeTitle
                >{String(item.data.title)}</TreeTitle
              >
            </div>{/snippet}</TreeItem
        >{/snippet}</TreeVirtualViewport
    ></TreeRoot
  >
</section>
