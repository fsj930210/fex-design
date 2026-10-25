<script lang="ts">
  import { Tree } from "@fex-design/svelte/ui/tree";
  import { treeDemoData } from "./_data/tree-demo";
  const treeProps = {
    treeData: treeDemoData.slice(0, 1),
    defaultExpandedKeys: ["root-1", "root-1-group-1"],
  };
</script>

<div class="w-full min-w-0">
  <Tree
    {...treeProps}
    classNames={{
      root: "w-full bg-slate-50",
      viewport: "h-64 overflow-y-auto",
      title: "font-medium",
      trigger: "text-violet-600",
    }}
    styles={{
      root: "padding:12px;border-radius:12px",
      title: "color:#7c3aed",
      item: "column-gap:12px",
    }}
  />
</div>
