<script setup lang="ts">
import type { TreeDataNode } from '@fex-design/vue/ui/tree'

import type { TreeInstance } from '@fex-design/vue/ui/tree'

import { ref } from 'vue'
import { Tree } from '@fex-design/vue/ui/tree'
import { Button } from '@fex-design/vue/ui/button'
import {
  virtualTreeDemoData,
  virtualTreeExpandedKeys,
  virtualTreeTargetKey,
  virtualTreeNodeCount,
} from './_data/tree-virtual-demo'
const treeProps = { treeData: virtualTreeDemoData, defaultExpandedKeys: virtualTreeExpandedKeys }
const viewport = ref<TreeInstance<TreeDataNode<string, string>>>()
</script>
<template>
  <section class="grid w-full gap-space-sm">
    <p class="text-sm text-muted-foreground">
      共 {{ virtualTreeNodeCount }} 个节点，240px 高度，仅渲染可视区域附近的行。
    </p>
    <Button @click="viewport?.scrollTo(virtualTreeTargetKey, { reveal: true })"
      >定位 Item 80.4.8</Button
    ><Tree ref="viewport" v-bind="treeProps" virtual :virtual-height="240" />
  </section>
</template>
