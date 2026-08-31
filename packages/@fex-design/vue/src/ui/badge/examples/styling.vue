<script setup lang="ts">
import { Badge } from '@fex-design/vue/ui/badge'
const classNames = {
  root: 'rounded-xl bg-violet-50 p-3',
  content: 'rounded-lg bg-violet-100 text-violet-950',
  indicator: 'font-bold',
}
const styles = {
  root: { outline: '2px dashed #7c3aed' },
  content: { padding: '16px 20px' },
  indicator: { background: '#7c3aed' },
}
</script>
<template><Badge :count="8" :class-names="classNames" :styles="styles">结构化样式</Badge></template>
