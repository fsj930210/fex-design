<script lang="ts">
  import type { TreeDataNode } from "@fex-design/svelte/ui/tree";

  import { onMount } from "svelte";
  import { Tree } from "@fex-design/svelte/ui/tree";
  import { Select } from "@fex-design/svelte/ui/select";
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

  const rootProps = $derived({ treeData, loadChildren: loadChildren });
  const pathProps = $derived({
    treeData: path?.treeData ?? [],
    defaultExpandedKeys: path?.expandedKeys ?? [],
  });
</script>

<div class="grid gap-space-sm">
  <Select
    class="w-72 max-w-full"
    options={matches}
    value={selected ?? []}
    searchable
    clearable
    filterOption={() => true}
    {loading}
    onSearch={search}
    onChange={choose}
    placeholder="搜索部门或节点"
    emptyText="没有匹配节点"
  />
  <p class="text-xs text-muted-foreground">
    可搜索：Department 2、Group 2.3、Item 2.3.3；清除选择恢复原树。
  </p>
  <div hidden={Boolean(selected)}><Tree {...rootProps} /></div>
  {#if locating}<p role="status">正在加载祖先路径…</p>{/if}
  {#if path}{#key selected}<Tree {...pathProps} />{/key}{/if}
</div>
