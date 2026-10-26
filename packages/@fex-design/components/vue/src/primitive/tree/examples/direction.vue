<script setup lang="ts">
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
} from '@fex-design/vue/primitive/tree'
import { treeDemoData } from './_data/tree-demo'
const options = {
  treeData: treeDemoData,
  features: [
    expansionFeature<Record<string, unknown>>({
      defaultExpandedKeys: ['root-1', 'root-1-group-1'],
    }),
  ],
}
const directions = ['ltr', 'rtl'] as const
</script>
<template>
  <div class="grid w-full gap-space-lg">
    <section v-for="direction in directions" :key="direction" class="grid gap-space-sm">
      <h3 class="font-medium">{{ direction === 'ltr' ? 'LTR · 从左向右' : 'RTL · 从右向左' }}</h3>
      <div :dir="direction" class="h-64 overflow-y-auto">
        <TreeRoot :options="options"
          ><TreeViewport v-slot="{ item }"
            ><TreeItem :item-key="item.key" v-slot="state"
              ><div :ref="state.setItemRef" v-bind="state.itemProps">
                <TreeTrigger :item-key="item.key" /><TreeTitle>{{ item.data.title }}</TreeTitle>
              </div></TreeItem
            ></TreeViewport
          ></TreeRoot
        >
      </div>
    </section>
  </div>
</template>
