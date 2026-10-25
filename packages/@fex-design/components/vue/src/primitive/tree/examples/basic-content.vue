<script setup lang="ts">
import type { TreeDataNode } from '@fex-design/vue/primitive/tree'

import { expansionFeature } from '@fex-design/vue/primitive/tree'
import {
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
  <TreeRoot
    :options="options"
    class="w-full max-w-xl rounded-md bg-background p-2"
    v-slot="{ tree }"
    ><TreeViewport v-slot="{ item }"
      ><TreeItem :item-key="item.key" v-slot="state"
        ><div :ref="state.setItemRef" v-bind="state.itemProps">
          <TreeTrigger :item-key="state.item.key" /><TreeTitle>{{
            state.item.data.title
          }}</TreeTitle>
        </div></TreeItem
      ></TreeViewport
    ></TreeRoot
  >
</template>
