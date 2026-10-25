<script setup lang="ts">
import type { TreeDataNode } from '@fex-design/vue/primitive/tree'
import {
  expansionFeature,
  TreeItem,
  TreeRoot,
  TreeTitle,
  TreeTrigger,
  TreeViewport,
} from '@fex-design/vue/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
const options = {
  treeData: treeDemoData,
  features: [
    expansionFeature<TreeDataNode<string, string>>({
      defaultExpandedKeys: ['root-1', 'root-1-group-1'],
    }),
  ],
}
</script>
<template>
  <TreeRoot :options="options" class="w-full max-w-xl rounded-md-primary/40 bg-muted/20 p-3"
    ><TreeViewport v-slot="{ item }"
      ><TreeItem :item-key="item.key" v-slot="state"
        ><div
          :ref="state.setItemRef"
          v-bind="state.itemProps"
          class="flex w-full items-center text-primary"
        >
          <TreeTrigger :item-key="item.key" /><TreeTitle>{{ item.data.title }}</TreeTitle>
        </div></TreeItem
      ></TreeViewport
    ></TreeRoot
  >
</template>
