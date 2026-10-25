<script lang="ts">
  import type { TreeDataNode } from "@fex-design/svelte/primitive/tree";

  import {
    TreeRoot,
    TreeViewport,
    TreeItem,
    expansionFeature,
  } from "@fex-design/svelte/primitive/tree";
  import { treeDemoData } from "./_data/tree-demo";
  const options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ["root-1", "root-1-group-1"],
      }),
    ],
  };
</script>

<section class="grid w-full gap-space-sm">
  <p class="text-sm text-muted-foreground">
    自定义行内容：名称、唯一 key 和层级；加减按钮展开或收起。
  </p>
  <div class="h-64 overflow-auto">
    <TreeRoot {options}
      >{#snippet children(tree)}<TreeViewport
          >{#snippet children(item)}<TreeItem itemKey={item.key}
              >{#snippet children(state)}<div {...state.itemProps}>
                  <div class="flex min-w-0 items-center gap-2">
                    {#if !item.isLeaf}<button
                        type="button"
                        class="size-5 shrink-0 rounded hover:bg-muted"
                        aria-expanded={tree
                          .getSnapshot()
                          .expandedKeys.includes(item.key)}
                        aria-label={"展开或收起 " + item.data.title}
                        onclick={(event) => {
                          event.stopPropagation();
                          tree
                            .getFeature<{ toggle(key: string | number): void }>(
                              "expansion",
                            )
                            ?.toggle(item.key);
                        }}
                        >{tree.getSnapshot().expandedKeys.includes(item.key)
                          ? "−"
                          : "+"}</button
                      >{:else}<span class="size-5 shrink-0"></span>{/if}<span
                      class="font-medium">{String(item.data.title)}</span
                    ><code class="text-xs text-muted-foreground"
                      >{String(item.key)}</code
                    ><span class="text-xs text-muted-foreground"
                      >depth {item.depth}</span
                    >
                  </div>
                </div>{/snippet}</TreeItem
            >{/snippet}</TreeViewport
        >{/snippet}</TreeRoot
    >
  </div>
</section>
