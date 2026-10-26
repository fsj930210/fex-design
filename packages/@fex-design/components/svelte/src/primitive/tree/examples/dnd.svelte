<script lang="ts">
  import {
    TreeRoot,
    TreeViewport,
    TreeItem,
    TreeTrigger,
    TreeTitle,
    treeDndItemAction,
    dndFeature,
    expansionFeature,
  } from "@fex-design/svelte/primitive/tree";
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
  const features = [
    expansionFeature<Record<string, unknown>>(),
    dndFeature<Record<string, unknown>>(),
  ];
  const options = $derived({
    treeData,
    expandedKeys,
    onExpandedKeysChange: (keys: readonly (string | number)[]) =>
      (expandedKeys = keys),
    disabled: busy,
    features,
  });
  const handleDrop: NonNullable<
    NonNullable<
      Parameters<
        typeof treeDndItemAction<Record<string, unknown>>
      >[1]["callbacks"]
    >["onDrop"]
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
  const callbacks = { onDrop: handleDrop };
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
