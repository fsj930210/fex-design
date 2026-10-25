<script lang="ts">
  import {
    TreeRoot,
    TreeViewport,
    TreeItem,
    TreeTrigger,
    TreeTitle,
    expansionFeature,
    selectionFeature,
  } from "@fex-design/svelte/primitive/tree";
  import {
    organizationTreeData,
    type OrganizationTreeNode,
  } from "./_data/tree-demo";
  const fieldNames = {
    key: "id",
    title: "name",
    isLeaf: "leaf",
    disabled: "unavailable",
  };
  let selected = $state<readonly (string | number)[]>([]);
  const change = (keys: readonly (string | number)[]) => {
    selected = keys;
  };
  const options = {
    treeData: organizationTreeData,
    fieldNames,
    defaultExpandedKeys: ["engineering", "frontend"],
    features: [
      expansionFeature<OrganizationTreeNode>(),
      selectionFeature<OrganizationTreeNode>(),
    ],
    onSelectedKeysChange: change,
  };
</script>

<section class="grid w-full gap-space-sm">
  <p class="text-xs text-muted-foreground">
    id → key；name → title；leaf → isLeaf；unavailable → disabled。
  </p>
  <div class="max-h-64 overflow-y-auto">
    <TreeRoot {options}
      ><TreeViewport
        >{#snippet children(item)}<TreeItem itemKey={item.key}
            >{#snippet children(state)}
              <div {...state.itemProps}>
                <TreeTrigger itemKey={item.key} /><TreeTitle
                  >{String(item.title)}</TreeTitle
                >
              </div>
            {/snippet}</TreeItem
          >{/snippet}</TreeViewport
      ></TreeRoot
    >
  </div>
  <output
    class="min-h-5 break-all text-xs text-muted-foreground"
    aria-live="polite">已选 ID：{selected.join(", ") || "无"}</output
  >
</section>
