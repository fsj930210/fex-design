<script setup lang="ts">
import { ref } from 'vue'
import { Tree, type TreeInstance } from '@fex-design/vue/ui/tree'
import { Button } from '@fex-design/vue/ui/button'
import { treeDemoData } from './_data/tree-demo'
const tree = ref<TreeInstance<Record<string, unknown>>>()
const message = ref('')
function locate() {
  const found = tree.value?.scrollTo('root-2-group-3-item-3', { reveal: true })
  message.value = found ? '已定位 Item 2.3.3' : '未能定位目标节点'
}
</script>
<template>
  <div class="grid w-full gap-space-sm">
    <Button class="w-full" @click="locate">Scroll to Item 2.3.3</Button>
    <Tree
      ref="tree"
      :tree-data="treeDemoData"
      :class-names="{ viewport: 'h-48 overflow-y-auto' }"
    />
    <output class="min-h-5 text-xs text-muted-foreground" aria-live="polite">{{ message }}</output>
  </div>
</template>
