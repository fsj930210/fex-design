<script lang="ts">
  import { Tree } from "@fex-design/svelte/ui/tree";
  import { treeDemoData } from "./_data/tree-demo";
  const treeProps = {
    treeData: treeDemoData,
    defaultExpandedKeys: ["root-1", "root-1-group-1"],
  };
</script>

<Tree {...treeProps} class="w-full max-w-xl rounded-md bg-background p-2" />
