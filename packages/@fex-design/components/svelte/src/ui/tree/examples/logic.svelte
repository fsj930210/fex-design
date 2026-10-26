<script lang="ts">
  import {
    createTreeStore,
    expansionFeature,
    selectionFeature,
  } from "@fex-design/svelte/ui/tree";
  import { treeDemoData } from "./_data/tree-demo";
  const { tree, snapshot, visibleItems } = createTreeStore({
    treeData: treeDemoData,
    features: [
      expansionFeature<Record<string, unknown>>({
        defaultExpandedKeys: ["root-1", "root-1-group-1"],
      }),
      selectionFeature<Record<string, unknown>>(),
    ],
  });
  const expansion = tree.getFeature<{ toggle(key: string | number): void }>(
    "expansion",
  );
  const selection = tree.getFeature<{ toggle(key: string | number): void }>(
    "selection",
  );
</script>

<section class="grid w-full gap-space-sm">
  <p class="text-sm text-muted-foreground">
    纯 DOM 树：点击箭头展开，点击名称选择。
  </p>
  <div role="tree" aria-label="自定义 DOM 树" class="max-h-64 overflow-y-auto">
    {#each $visibleItems as item (item.key)}<div
        role="treeitem"
        aria-level={item.depth + 1}
        aria-expanded={item.isLeaf
          ? undefined
          : $snapshot.expandedKeys.includes(item.key)}
        aria-selected={$snapshot.selectedKeys.includes(item.key)}
        class="flex min-h-8 items-center gap-2"
        style:padding-inline-start={item.depth * 20 + "px"}
      >
        {#if !item.isLeaf}<button
            type="button"
            class="size-6 shrink-0 rounded hover:bg-muted"
            aria-label={"展开或收起 " + item.data.title}
            onclick={() => expansion?.toggle(item.key)}
            >{$snapshot.expandedKeys.includes(item.key) ? "−" : "+"}</button
          >{:else}<span class="size-6 shrink-0"></span>{/if}
        <button
          type="button"
          class="rounded px-2 py-1 hover:bg-muted"
          style={$snapshot.selectedKeys.includes(item.key)
            ? "background:#ede9fe;color:#6d28d9"
            : undefined}
          onclick={() => selection?.toggle(item.key)}
          >{String(item.data.title)}</button
        >
      </div>{/each}
  </div>
  <output class="text-sm" aria-live="polite"
    >已选：{$snapshot.selectedKeys
      .map((key) => String(tree.getItem(key)?.data.title ?? key))
      .join("、") || "无"}</output
  >
</section>
