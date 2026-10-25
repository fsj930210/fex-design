<script lang="ts">
  import type { TreeDataNode } from "@fex-design/svelte/primitive/tree";

  import {
    TreeRoot,
    TreeViewport,
    TreeItem,
    TreeTrigger,
    TreeTitle,
    expansionFeature,
    asyncLoadFeature,
  } from "@fex-design/svelte/primitive/tree";
  import { Spinner } from "@fex-design/svelte/primitive/spinner";
  import {
    asyncTreeDemoData,
    createTreeDemoChildren,
  } from "./_data/tree-async-demo";
  import { updateRemoteChildren } from "./_data/tree-remote-demo";
  let treeData =
    $state<readonly TreeDataNode<string, string>[]>(asyncTreeDemoData);
  const features = [
    expansionFeature<TreeDataNode<string, string>>(),
    asyncLoadFeature<TreeDataNode<string, string>>({
      loadChildren: async (item) => {
        const children = await new Promise<
          readonly TreeDataNode<string, string>[]
        >((resolve) =>
          setTimeout(
            () => resolve(createTreeDemoChildren(String(item.key))),
            400,
          ),
        );
        treeData = updateRemoteChildren(treeData, String(item.key), children);
        return children;
      },
    }),
  ];
  const options = $derived({ treeData, features });
</script>

<div class="grid w-full gap-space-sm">
  <p class="text-sm text-muted-foreground">
    展开 Lazy department，加载期间显示 Spinner，完成后显示子节点。
  </p>
  <TreeRoot {options}
    ><TreeViewport
      >{#snippet children(item)}<TreeItem itemKey={item.key}
          >{#snippet children(state)}<div {...state.itemProps}>
              {#if state.loadState === "loading"}<Spinner
                  size="sm"
                  aria-label="Loading children"
                />{:else}<TreeTrigger itemKey={item.key} />{/if}<TreeTitle
                >{String(item.data.title)}</TreeTitle
              >
            </div>{/snippet}</TreeItem
        >{/snippet}</TreeViewport
    ></TreeRoot
  >
</div>
