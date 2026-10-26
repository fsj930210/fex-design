<script lang="ts">
  import { untrack } from "svelte";
  import {
    TreeRoot,
    TreeViewport,
    TreeItem,
    createTreeStore,
    expansionFeature,
    selectionFeature,
  } from "@fex-design/svelte/primitive/tree";
  import { Button } from "@fex-design/svelte/primitive/button";
  import CrudRow from "./crud-row.svelte";
  import { treeCrudData } from "./_data/tree-crud-demo";
  import { createTreeDemoService } from "./_data/tree-edit-demo";
  const service = createTreeDemoService(treeCrudData);
  let treeData = $state<readonly Record<string, unknown>[]>(treeCrudData);
  let expandedKeys = $state<readonly (string | number)[]>([
    "department-1",
    "group-1",
  ]);
  let busy = $state(false);
  let message = $state("修改接口成功后重新获取树，外部 treeData 是唯一数据源");
  const features = [
    expansionFeature<Record<string, unknown>>(),
    selectionFeature<Record<string, unknown>>(),
  ];
  const options = $derived({
    treeData,
    expandedKeys,
    onExpandedKeysChange: (keys: readonly (string | number)[]) =>
      (expandedKeys = keys),
    features,
  });
  const { tree } = untrack(() => createTreeStore(options));
  async function run(
    operation: () => Promise<void>,
    success: string,
    parentKey?: string | number,
  ) {
    if (busy) return;
    busy = true;
    message = "正在提交修改并重新获取树…";
    try {
      await operation();
      treeData = await service.fetchTree();
      if (parentKey !== undefined && !expandedKeys.includes(parentKey))
        expandedKeys = [...expandedKeys, parentKey];
      message = success;
    } catch (error) {
      message = error instanceof Error ? error.message : "操作失败，保留原数据";
    } finally {
      busy = false;
    }
  }
  function addRoot() {
    return run(() => service.create(null), "已新增根节点，已重新获取 treeData");
  }
</script>

<section class="grid w-full gap-space-sm">
  <p class="text-sm text-muted-foreground">
    双击名称编辑；Enter 或失焦保存，Escape 取消；删除节点会删除其整个子树。
  </p>
  <div class="flex gap-2">
    <Button disabled={busy} onclick={addRoot}>新增根节点</Button>
  </div>
  <div class="h-64 overflow-y-auto p-1">
    <TreeRoot controller={tree} {options} rowHeight={40}
      ><TreeViewport
        >{#snippet children(item)}<TreeItem itemKey={item.key} block
            >{#snippet children(state)}<div {...state.itemProps}>
                <CrudRow
                  title={String(item.title)}
                  leaf={item.isLeaf}
                  {busy}
                  expanded={tree.getSnapshot().expandedKeys.includes(item.key)}
                  onToggle={() =>
                    tree
                      .getFeature<{ toggle(key: string | number): void }>(
                        "expansion",
                      )
                      ?.toggle(item.key)}
                  onSave={(title) =>
                    run(
                      () => service.rename(item.key, title),
                      "已更新名称，已重新获取 treeData",
                    )}
                  onAdd={() =>
                    run(
                      () => service.create(item.key),
                      "已新增子节点，已重新获取 treeData",
                      item.key,
                    )}
                  onRemove={() =>
                    run(
                      () => service.remove(item.key),
                      "已删除节点，已重新获取 treeData",
                    )}
                />
              </div>{/snippet}</TreeItem
          >{/snippet}</TreeViewport
      ></TreeRoot
    >
  </div>
  <output class="text-xs text-muted-foreground" aria-live="polite"
    >{message}</output
  >
</section>
