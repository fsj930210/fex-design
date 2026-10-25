<script lang="ts">
  import type { TreeDataNode } from "@fex-design/svelte/primitive/tree";

  import {
    TreeRoot,
    TreeViewport,
    TreeItem,
    TreeTrigger,
    TreeTitle,
    expansionFeature,
  } from "@fex-design/svelte/primitive/tree";
  import { InputRoot, InputControl } from "@fex-design/svelte/primitive/input";
  import {
    filterTreeDemoData,
    getTreeSearchExpandedKeys,
    splitTreeSearchTitle,
  } from "./_data/tree-search-demo";
  let keyword = $state("");
  let expandedKeys = $state<readonly (string | number)[]>([]);
  function search(value: string) {
    keyword = value;
    expandedKeys = getTreeSearchExpandedKeys(value);
  }
  const features = [expansionFeature<TreeDataNode<string, string>>()];
  const options = $derived({
    treeData: filterTreeDemoData(keyword),
    expandedKeys,
    onExpandedKeysChange: (keys: readonly (string | number)[]) =>
      (expandedKeys = keys),
    features,
  });
</script>

{#snippet title(text: string)}{@const parts = splitTreeSearchTitle(
    text,
    keyword,
  )}<span
    >{parts.before}{#if parts.match}<mark
        class="rounded-sm bg-warning/20 px-0.5 text-inherit">{parts.match}</mark
      >{/if}{parts.after}</span
  >{/snippet}
<div class="grid w-full gap-space-sm">
  <InputRoot value={keyword} onValueChange={search}
    ><InputControl
      placeholder="Search tree"
      aria-label="Search tree"
    /></InputRoot
  >
  <div class="max-h-64 overflow-y-auto">
    <TreeRoot {options}
      ><TreeViewport
        >{#snippet children(item)}<TreeItem itemKey={item.key}
            >{#snippet children(state)}<div {...state.itemProps}>
                <TreeTrigger itemKey={item.key} /><TreeTitle
                  >{@render title(String(item.data.title))}</TreeTitle
                >
              </div>{/snippet}</TreeItem
          >{/snippet}</TreeViewport
      ></TreeRoot
    >
  </div>
</div>
