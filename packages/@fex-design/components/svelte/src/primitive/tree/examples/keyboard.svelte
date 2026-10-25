<script lang="ts">
  import type { TreeDataNode } from "@fex-design/svelte/primitive/tree";

  import {
    TreeRoot,
    TreeViewport,
    TreeItem,
    TreeTrigger,
    TreeTitle,
    TreeCheckbox,
    expansionFeature,
    focusFeature,
    keyboardFeature,
    selectionFeature,
    checkFeature,
  } from "@fex-design/svelte/primitive/tree";
  import { treeDemoData } from "./_data/tree-demo";
  let focused = $state<string | number | null>(null),
    selected = $state<readonly (string | number)[]>([]),
    checked = $state<readonly (string | number)[]>([]);
  const options = {
    treeData: treeDemoData,
    features: [
      expansionFeature<TreeDataNode<string, string>>({
        defaultExpandedKeys: ["root-1", "root-1-group-1"],
      }),
      focusFeature<TreeDataNode<string, string>>(),
      keyboardFeature<TreeDataNode<string, string>>(),
      selectionFeature<TreeDataNode<string, string>>(),
      checkFeature<TreeDataNode<string, string>>(),
    ],
    onFocusedKeyChange: (key: string | number | null) => (focused = key),
    onSelectedKeysChange: (keys: readonly (string | number)[]) =>
      (selected = keys),
    onCheckedKeysChange: (keys: readonly (string | number)[]) =>
      (checked = keys),
  };
</script>

<section class="grid w-full gap-space-sm">
  <p class="text-sm text-muted-foreground">
    逐次按 Tab 进入树，Shift+Tab 返回；进入后用 ↑/↓、Home/End 移动节点焦点，←/→
    收起或展开，Enter 选择，Space 勾选。再次按 Tab
    离开树；鼠标悬停不会切换键盘焦点。
  </p>
  <div class="h-64 overflow-y-auto">
    <TreeRoot {options}
      ><TreeViewport
        >{#snippet children(item)}<TreeItem itemKey={item.key}
            >{#snippet children(state)}<div {...state.itemProps}>
                <TreeTrigger itemKey={item.key} /><TreeCheckbox
                  itemKey={item.key}
                /><TreeTitle>{String(item.data.title)}</TreeTitle>
              </div>{/snippet}</TreeItem
          >{/snippet}</TreeViewport
      ></TreeRoot
    >
  </div>
  <output class="break-all text-xs" aria-live="polite"
    >焦点：{focused ?? "无"}；选择：{selected.join(", ") ||
      "无"}；勾选：{checked.join(", ") || "无"}</output
  >
</section>
