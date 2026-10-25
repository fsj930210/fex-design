<script setup lang="ts">
import { ref } from 'vue'
import { Tree } from '@fex-design/vue/ui/tree'
import { treeDemoData } from './_data/tree-demo'
const selected = ref<readonly (string | number)[]>([]),
  checked = ref<readonly (string | number)[]>([])
const treeProps = {
  treeData: treeDemoData,
  defaultExpandedKeys: ['root-1', 'root-1-group-1'],
  onSelect: (keys: readonly (string | number)[]) => (selected.value = keys),
  onCheck: (keys: readonly (string | number)[]) => (checked.value = keys),
}
</script>
<template>
  <section class="grid w-full gap-space-sm">
    <p class="text-sm text-muted-foreground">
      逐次按 Tab 进入树，Shift+Tab 返回；进入后用 ↑/↓、Home/End 移动节点焦点，←/→ 收起或展开，Enter
      选择，Space 勾选。再次按 Tab 离开树；鼠标悬停不会切换键盘焦点。
    </p>
    <div class="h-64 overflow-y-auto"><Tree v-bind="treeProps" checkable /></div>
    <output class="break-all text-xs" aria-live="polite"
      >选择：{{ selected.join(', ') || '无' }}；勾选：{{ checked.join(', ') || '无' }}</output
    >
  </section>
</template>
