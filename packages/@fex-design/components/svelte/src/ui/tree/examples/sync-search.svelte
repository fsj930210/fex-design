<script lang="ts">
  import ChevronDownIcon from "@fex-design/svelte/icons/chevron-down";
  import {
    treeTriggerClassName,
    treeTitleClassName,
  } from "@fex-design/components-styles/tree";

  import { Tree } from "@fex-design/svelte/ui/tree";
  import { Input } from "@fex-design/svelte/ui/input";
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

  const treeProps = $derived({
    treeData: filterTreeDemoData(keyword),
    expandedKeys,
    onExpand: (keys: readonly (string | number)[]) => (expandedKeys = keys),
  });
</script>

{#snippet title(text: string)}{@const parts = splitTreeSearchTitle(
    text,
    keyword,
  )}<span class={treeTitleClassName}
    >{parts.before}{#if parts.match}<mark
        class="rounded-sm bg-warning/20 px-0.5 text-inherit">{parts.match}</mark
      >{/if}{parts.after}</span
  >{/snippet}
<div class="grid w-full gap-space-sm">
  <Input
    value={keyword}
    onValueChange={search}
    placeholder="Search tree"
    aria-label="Search tree"
  />
  <div class="max-h-64 overflow-y-auto">
    <Tree {...treeProps}
      >{#snippet renderItem(item, tree)}{#if !item.isLeaf}<button
            type="button"
            class={treeTriggerClassName}
            aria-expanded={expandedKeys.includes(item.key)}
            aria-label={"展开或收起 " + item.data.title}
            onclick={(event) => {
              event.stopPropagation();
              tree
                .getFeature<{ toggle(key: string | number): void }>("expansion")
                ?.toggle(item.key);
            }}><ChevronDownIcon class="size-4" /></button
          >{:else}<span class="size-5 shrink-0"></span>{/if}{@render title(
          String(item.data.title),
        )}{/snippet}</Tree
    >
  </div>
</div>
