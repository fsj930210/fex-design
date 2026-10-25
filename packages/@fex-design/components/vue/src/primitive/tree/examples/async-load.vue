<script setup lang="ts">
import type { TreeDataNode } from '@fex-design/vue/primitive/tree'

import { shallowRef, computed } from 'vue'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  asyncLoadFeature,
} from '@fex-design/vue/primitive/tree'
import { Spinner } from '@fex-design/vue/primitive/spinner'
import { asyncTreeDemoData, createTreeDemoChildren } from './_data/tree-async-demo'
import { updateRemoteChildren } from './_data/tree-remote-demo'
const treeData = shallowRef<readonly TreeDataNode<string, string>[]>(asyncTreeDemoData)
const features = [
  expansionFeature<TreeDataNode<string, string>>(),
  asyncLoadFeature<TreeDataNode<string, string>>({
    loadChildren: async (item) => {
      const children = await new Promise<readonly TreeDataNode<string, string>[]>((resolve) =>
        setTimeout(() => resolve(createTreeDemoChildren(String(item.key))), 400),
      )
      treeData.value = updateRemoteChildren(treeData.value, String(item.key), children)
      return children
    },
  }),
]
const options = computed(() => ({ treeData: treeData.value, features }))
</script>
<template>
  <div class="grid w-full gap-space-sm">
    <p class="text-sm text-muted-foreground">
      展开 Lazy department，加载期间显示 Spinner，完成后显示子节点。
    </p>
    <TreeRoot :options="options"
      ><TreeViewport v-slot="{ item }"
        ><TreeItem :item-key="item.key" v-slot="state"
          ><div :ref="state.setItemRef" v-bind="state.itemProps">
            <Spinner
              v-if="state.loadState === 'loading'"
              size="sm"
              aria-label="Loading children"
            /><TreeTrigger v-else :item-key="item.key" /><TreeTitle>{{
              item.data.title
            }}</TreeTitle>
          </div></TreeItem
        ></TreeViewport
      ></TreeRoot
    >
  </div>
</template>
