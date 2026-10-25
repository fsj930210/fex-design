<script setup lang="ts">
import { ref } from 'vue'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  focusFeature,
  type TreeDataNode,
} from '@fex-design/vue/primitive/tree'
import { Button } from '@fex-design/vue/primitive/button'
import { treeDemoData } from './_data/tree-demo'
const viewport = ref<{ scrollTo(key: string, options: { reveal: boolean }): boolean }>()
const message = ref('')
const options = {
  treeData: treeDemoData,
  features: [
    expansionFeature<TreeDataNode<string, string>>(),
    focusFeature<TreeDataNode<string, string>>(),
  ],
}
function locate() {
  const found = viewport.value?.scrollTo('root-2-group-3-item-3', { reveal: true })
  message.value = found ? '已定位 Item 2.3.3' : '未能定位目标节点'
}
</script>
<template>
  <div class="grid w-full gap-space-sm">
    <Button class="w-full" @click="locate">Scroll to Item 2.3.3</Button>
    <TreeRoot :options="options"
      ><TreeViewport ref="viewport" class="h-48 overflow-y-auto" v-slot="{ item }">
        <TreeItem :item-key="item.key" v-slot="state"
          ><div :ref="state.setItemRef" v-bind="state.itemProps">
            <TreeTrigger :item-key="item.key" /><TreeTitle>{{ item.title }}</TreeTitle>
          </div></TreeItem
        >
      </TreeViewport></TreeRoot
    >
    <output class="min-h-5 text-xs text-muted-foreground" aria-live="polite">{{ message }}</output>
  </div>
</template>
