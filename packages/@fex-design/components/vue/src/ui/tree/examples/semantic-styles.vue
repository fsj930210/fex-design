<script setup lang="ts">
import { Tree } from '@fex-design/vue/ui/tree'
import { treeDemoData } from './_data/tree-demo'
const treeProps = {
  treeData: treeDemoData.slice(0, 1),
  defaultExpandedKeys: ['root-1', 'root-1-group-1'],
}
const classNames = {
  root: 'w-full bg-slate-50',
  viewport: 'h-64 overflow-y-auto',
  title: 'font-medium',
  trigger: 'text-violet-600',
}
const styles = {
  root: { padding: '12px', borderRadius: '12px' },
  title: { color: '#7c3aed' },
  item: { columnGap: '12px' },
}
</script>
<template>
  <div class="w-full min-w-0">
    <Tree v-bind="treeProps" :class-names="classNames" :styles="styles" />
  </div>
</template>
