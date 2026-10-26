<script setup lang="ts">
import { ref } from 'vue'
import {
  TreeRoot,
  TreeVirtualViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  focusFeature,
} from '@fex-design/vue/primitive/tree'
import { Button } from '@fex-design/vue/primitive/button'
import {
  virtualTreeDemoData,
  virtualTreeExpandedKeys,
  virtualTreeTargetKey,
  virtualTreeNodeCount,
} from './_data/tree-virtual-demo'
const options = {
  treeData: virtualTreeDemoData,
  defaultExpandedKeys: virtualTreeExpandedKeys,
  features: [expansionFeature<Record<string, unknown>>(), focusFeature<Record<string, unknown>>()],
}
const viewport = ref<{ scrollTo(key: string, options?: { reveal?: boolean }): boolean }>()
</script>
<template>
  <section class="grid w-full gap-space-sm">
    <p class="text-sm text-muted-foreground">
      共 {{ virtualTreeNodeCount }} 个节点，240px 高度，仅渲染可视区域附近的行。
    </p>
    <Button @click="viewport?.scrollTo(virtualTreeTargetKey, { reveal: true })"
      >定位 Item 80.4.8</Button
    ><TreeRoot :options="options"
      ><TreeVirtualViewport ref="viewport" :height="240" v-slot="{ item }"
        ><TreeItem :item-key="item.key" v-slot="state"
          ><div :ref="state.setItemRef" v-bind="state.itemProps">
            <TreeTrigger :item-key="item.key" /><TreeTitle>{{ item.data.title }}</TreeTitle>
          </div></TreeItem
        ></TreeVirtualViewport
      ></TreeRoot
    >
  </section>
</template>
