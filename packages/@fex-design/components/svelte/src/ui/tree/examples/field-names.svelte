<script lang="ts">
  import { Tree } from "@fex-design/svelte/ui/tree";
  import { organizationTreeData } from "./_data/tree-demo";
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
</script>

<section class="grid w-full gap-space-sm">
  <p class="text-xs text-muted-foreground">
    id → key；name → title；leaf → isLeaf；unavailable → disabled。
  </p>
  <div class="max-h-64 overflow-y-auto">
    <Tree
      treeData={organizationTreeData}
      {fieldNames}
      defaultExpandedKeys={["engineering", "frontend"]}
      onSelect={change}
    />
  </div>
  <output
    class="min-h-5 break-all text-xs text-muted-foreground"
    aria-live="polite">已选 ID：{selected.join(", ") || "无"}</output
  >
</section>
