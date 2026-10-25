<script setup lang="ts">
import { ref } from 'vue'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  selectionFeature,
} from '@fex-design/vue/primitive/tree'
import { organizationTreeData, type OrganizationTreeNode } from './_data/tree-demo'
const fieldNames = { key: 'id', title: 'name', isLeaf: 'leaf', disabled: 'unavailable' }
const selected = ref<readonly (string | number)[]>([])
const change = (keys: readonly (string | number)[]) => {
  selected.value = keys
}
const options = {
  treeData: organizationTreeData,
  fieldNames,
  defaultExpandedKeys: ['engineering', 'frontend'],
  features: [expansionFeature<OrganizationTreeNode>(), selectionFeature<OrganizationTreeNode>()],
  onSelectedKeysChange: change,
}
</script>
<template>
  <section class="grid w-full gap-space-sm">
    <p class="text-xs text-muted-foreground">
      id → key；name → title；leaf → isLeaf；unavailable → disabled。
    </p>
    <div class="max-h-64 overflow-y-auto">
      <TreeRoot :options="options"
        ><TreeViewport v-slot="{ item }"
          ><TreeItem :item-key="item.key" v-slot="state">
            <div :ref="state.setItemRef" v-bind="state.itemProps">
              <TreeTrigger :item-key="item.key" /><TreeTitle>{{ item.title }}</TreeTitle>
            </div>
          </TreeItem></TreeViewport
        ></TreeRoot
      >
    </div>
    <output class="min-h-5 break-all text-xs text-muted-foreground" aria-live="polite"
      >已选 ID：{{ selected.join(', ') || '无' }}</output
    >
  </section>
</template>
