<script lang="ts">
  import type { TreeDataNode } from "@fex-design/svelte/primitive/tree";

  import { onMount } from "svelte";
  import {
    TreeRoot,
    TreeViewport,
    TreeItem,
    TreeTrigger,
    TreeTitle,
    expansionFeature,
    asyncLoadFeature,
  } from "@fex-design/svelte/primitive/tree";
  import {
    SelectRoot,
    SelectTrigger,
    SelectContent,
  } from "@fex-design/svelte/primitive/select";
  import {
    loadRemoteTree,
    searchRemoteTree,
    loadRemoteAncestors,
    updateRemoteChildren,
    type TreeSearchMatch,
    type TreeAncestorResult,
  } from "./_data/tree-remote-demo";
  let treeData = $state<readonly TreeDataNode<string, string>[]>([]);
  let matches = $state<TreeSearchMatch[]>([]);
  let selected = $state<string>();
  let path = $state<TreeAncestorResult>();
  let loading = $state(false),
    locating = $state(false);
  let searchId = 0,
    pathId = 0;
  onMount(() => {
    let active = true;
    void loadRemoteTree().then((roots) => {
      if (active) treeData = roots;
    });
    return () => {
      active = false;
      searchId++;
      pathId++;
    };
  });
  async function search(keyword: string) {
    const request = ++searchId;
    loading = true;
    const result = await searchRemoteTree(keyword);
    if (request !== searchId) return;
    matches = result;
    loading = false;
  }
  async function choose(value: unknown) {
    const request = ++pathId;
    searchId++;
    loading = false;
    path = undefined;
    if (typeof value !== "string") {
      selected = undefined;
      matches = [];
      locating = false;
      return;
    }
    selected = value;
    locating = true;
    const result = await loadRemoteAncestors(value);
    if (request !== pathId) return;
    path = result;
    locating = false;
  }
  async function loadChildren(item: { key: string | number }) {
    const children = await loadRemoteTree(String(item.key));
    treeData = updateRemoteChildren(treeData, String(item.key), children);
    return children;
  }
  const features = [
    expansionFeature<TreeDataNode<string, string>>(),
    asyncLoadFeature<TreeDataNode<string, string>>({ loadChildren }),
  ];
  const rootOptions = $derived({ treeData, features });
  const pathOptions = $derived({
    treeData: path?.treeData ?? [],
    defaultExpandedKeys: path?.expandedKeys ?? [],
    features: [expansionFeature<TreeDataNode<string, string>>()],
  });
</script>

<div class="grid gap-space-sm">
  <SelectRoot
    options={matches}
    value={selected ?? []}
    showSearch
    clearable
    filterOption={() => true}
    {loading}
    onSearch={search}
    onChange={choose}
    ><SelectTrigger
      class="w-72 max-w-full"
      placeholder="搜索部门或节点"
    /><SelectContent
      loadingContent="搜索中…"
      emptyContent="没有匹配节点"
    /></SelectRoot
  >
  <p class="text-xs text-muted-foreground">
    可搜索：Department 2、Group 2.3、Item 2.3.3；清除选择恢复原树。
  </p>
  <div hidden={Boolean(selected)}>
    <TreeRoot options={rootOptions}
      ><TreeViewport
        >{#snippet children(item)}<TreeItem itemKey={item.key}
            >{#snippet children(state)}<div {...state.itemProps}>
                <TreeTrigger itemKey={item.key} /><TreeTitle
                  >{String(item.data.title)}</TreeTitle
                >
              </div>{/snippet}</TreeItem
          >{/snippet}</TreeViewport
      ></TreeRoot
    >
  </div>
  {#if locating}<p role="status">正在加载祖先路径…</p>{/if}
  {#if path}{#key selected}<TreeRoot options={pathOptions}
        ><TreeViewport
          >{#snippet children(item)}<TreeItem itemKey={item.key}
              >{#snippet children(state)}<div {...state.itemProps}>
                  <TreeTrigger itemKey={item.key} /><TreeTitle
                    >{String(item.data.title)}</TreeTitle
                  >
                </div>{/snippet}</TreeItem
            >{/snippet}</TreeViewport
        ></TreeRoot
      >{/key}{/if}
</div>
