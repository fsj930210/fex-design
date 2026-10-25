<script lang="ts">
  import type { TreeDataNode } from "@fex-design/svelte/ui/tree";

  import { Tree, type TreeDragEventContext } from "@fex-design/svelte/ui/tree";
  import { treeDndDemoData } from "./_data/tree-demo";
  const treeProps = {
    treeData: treeDndDemoData,
    defaultExpandedKeys: ["root-1", "root-1-group-1"],
  };
  let message = $state(
    "Item 1.1.2 不可拖动；Item 1.1.3 不可放置。其他节点可拖放。",
  );
  const handleDrop = ({
    sourceItem,
    targetItem,
    intent,
  }: TreeDragEventContext<TreeDataNode<string, string>>) => {
    if (!intent?.valid) return;
    message = `${String(sourceItem?.data.title)} → ${String(targetItem?.data.title)}（${intent.position === "inside" ? "成为子节点" : "排在其后"}）`;
  };
</script>

<div class="w-[min(36rem,100%)] min-w-0">
  <p class="mb-space-sm min-h-10 break-all text-sm text-muted-foreground">
    {message}
  </p>
  <Tree {...treeProps} draggable onDrop={handleDrop} />
</div>
