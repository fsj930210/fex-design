<script lang="ts">
  import { Tree } from "@fex-design/svelte/ui/tree";
  import { treeDemoData } from "./_data/tree-demo";
  const treeProps = {
    treeData: treeDemoData,
    defaultExpandedKeys: ["root-1", "root-1-group-1"],
  };
  const directions = ["ltr", "rtl"] as const;
</script>

<div class="grid w-full gap-space-lg">
  {#each directions as direction (direction)}<section class="grid gap-space-sm">
      <h3 class="font-medium">
        {direction === "ltr" ? "LTR · 从左向右" : "RTL · 从右向左"}
      </h3>
      <div dir={direction} class="h-64 overflow-y-auto">
        <Tree {...treeProps} />
      </div>
    </section>{/each}
</div>
