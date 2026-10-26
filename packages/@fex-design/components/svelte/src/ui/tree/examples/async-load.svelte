<script lang="ts">
  import { Tree } from "@fex-design/svelte/ui/tree";

  import {
    asyncTreeDemoData,
    createTreeDemoChildren,
  } from "./_data/tree-async-demo";
  import { updateRemoteChildren } from "./_data/tree-remote-demo";
  let treeData = $state<readonly Record<string, unknown>[]>(asyncTreeDemoData);

  const treeProps = $derived({
    treeData,
    loadChildren: async (item: { key: string | number }) => {
      const children = await new Promise<readonly Record<string, unknown>[]>(
        (resolve) =>
          setTimeout(
            () => resolve(createTreeDemoChildren(String(item.key))),
            400,
          ),
      );
      treeData = updateRemoteChildren(treeData, String(item.key), children);
    },
  });
</script>

<div class="grid w-full gap-space-sm">
  <p class="text-sm text-muted-foreground">
    展开 Lazy department，加载期间显示 Spinner，完成后显示子节点。
  </p>
  <Tree {...treeProps} />
</div>
