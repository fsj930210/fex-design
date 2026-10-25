<script setup lang="ts">
import type { TreeDataNode } from '@fex-design/vue/ui/tree'

import { shallowRef, computed } from 'vue'
import { Tree } from '@fex-design/vue/ui/tree'

import { asyncTreeDemoData, createTreeDemoChildren } from './_data/tree-async-demo'
import { updateRemoteChildren } from './_data/tree-remote-demo'
const treeData = shallowRef<readonly TreeDataNode<string, string>[]>(asyncTreeDemoData)

const treeProps = computed(() => ({
  treeData: treeData.value,
  loadChildren: async (item: { key: string | number }) => {
    const children = await new Promise<readonly TreeDataNode<string, string>[]>((resolve) =>
      setTimeout(() => resolve(createTreeDemoChildren(String(item.key))), 400),
    )
    treeData.value = updateRemoteChildren(treeData.value, String(item.key), children)
    return children
  },
}))
</script>
<template>
  <div class="grid w-full gap-space-sm">
    <p class="text-sm text-muted-foreground">
      展开 Lazy department，加载期间显示 Spinner，完成后显示子节点。
    </p>
    <Tree v-bind="treeProps" />
  </div>
</template>
