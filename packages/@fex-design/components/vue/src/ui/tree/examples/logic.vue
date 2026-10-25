<script setup lang="ts">
import type { TreeDataNode } from '@fex-design/vue/ui/tree'

import {
  useTree,
  useTreeVisibleItems,
  expansionFeature,
  selectionFeature,
} from '@fex-design/vue/ui/tree'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
import { treeDemoData } from './_data/tree-demo'
const options = {
  treeData: treeDemoData,
  features: [
    expansionFeature<TreeDataNode<string, string>>({
      defaultExpandedKeys: ['root-1', 'root-1-group-1'],
    }),
    selectionFeature<TreeDataNode<string, string>>(),
  ],
}
const tree = useTree(() => options)
const items = useTreeVisibleItems(tree)
const snapshot = useCoreStore({ getSnapshot: tree.getSnapshot, subscribe: tree.subscribe })
const expansion = tree.getFeature<{ toggle(key: string | number): void }>('expansion')
const selection = tree.getFeature<{ toggle(key: string | number): void }>('selection')
</script>
<template>
  <section class="grid w-full gap-space-sm">
    <p class="text-sm text-muted-foreground">纯 DOM 树：点击箭头展开，点击名称选择。</p>
    <div role="tree" aria-label="自定义 DOM 树" class="max-h-64 overflow-y-auto">
      <div
        v-for="item in items"
        :key="item.key"
        role="treeitem"
        :aria-level="item.depth + 1"
        :aria-expanded="item.isLeaf ? undefined : snapshot.expandedKeys.includes(item.key)"
        :aria-selected="snapshot.selectedKeys.includes(item.key)"
        class="flex min-h-8 items-center gap-2"
        :style="{ paddingInlineStart: item.depth * 20 + 'px' }"
      >
        <button
          v-if="!item.isLeaf"
          type="button"
          class="size-6 shrink-0 rounded hover:bg-muted"
          :aria-label="'展开或收起 ' + item.data.title"
          @click="expansion?.toggle(item.key)"
        >
          {{ snapshot.expandedKeys.includes(item.key) ? '−' : '+' }}</button
        ><span v-else class="size-6 shrink-0" />
        <button
          type="button"
          class="rounded px-2 py-1 hover:bg-muted"
          :style="
            snapshot.selectedKeys.includes(item.key)
              ? { background: '#ede9fe', color: '#6d28d9' }
              : undefined
          "
          @click="selection?.toggle(item.key)"
        >
          {{ item.data.title }}
        </button>
      </div>
    </div>
    <output class="text-sm" aria-live="polite"
      >已选：{{
        snapshot.selectedKeys.map((key) => tree.getItem(key)?.data.title ?? key).join('、') || '无'
      }}</output
    >
  </section>
</template>
