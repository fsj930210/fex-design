<script lang="ts">
  import { Tree, type TreeBehaviorProps } from "@fex-design/svelte/ui/tree";
  import { treeDndDemoData } from "./_data/tree-demo";
  import { createTreeDemoService } from "./_data/tree-edit-demo";
  const service = createTreeDemoService(treeDndDemoData);
  let treeData = $state<readonly Record<string, unknown>[]>(treeDndDemoData);
  let expandedKeys = $state<readonly (string | number)[]>([
    "root-1",
    "root-1-group-1",
  ]);
  let busy = $state(false);
  let message = $state(
    "Item 1.1.2 不可拖动；Item 1.1.3 不可放置。放置后调用接口并重新获取树。",
  );
  const treeProps = $derived({
    treeData,
    expandedKeys,
    onExpand: (keys: readonly (string | number)[]) => (expandedKeys = keys),
    disabled: busy,
  });
  const handleDrop: NonNullable<
    TreeBehaviorProps<Record<string, unknown>>["onDrop"]
  > = async ({ sourceItem, targetItem, intent }) => {
    if (!intent?.valid || busy) return;
    busy = true;
    message = "正在提交移动并重新获取树…";
    try {
      await service.move({
        sourceKey: intent.sourceKey,
        parentKey: intent.parentKey,
        index: intent.index,
      });
      treeData = await service.fetchTree();
      if (
        intent.position === "inside" &&
        !expandedKeys.includes(intent.targetKey)
      )
        expandedKeys = [...expandedKeys, intent.targetKey];
      message =
        String(sourceItem?.title) +
        " → " +
        String(targetItem?.title) +
        "；已更新外部 treeData";
    } catch (error) {
      message = error instanceof Error ? error.message : "移动失败，保留原数据";
    } finally {
      busy = false;
    }
  };
</script>

<div class="w-[min(36rem,100%)] min-w-0">
  <p class="mb-space-sm min-h-10 break-all text-sm text-muted-foreground">
    {message}
  </p>
  <Tree {...treeProps} draggable onDrop={handleDrop} />
</div>
