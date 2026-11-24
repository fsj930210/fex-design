<script setup lang="ts">
import { Dropdown } from '@fex-design/vue/ui/dropdown'
const items = [
  { value: 'rename', label: '重命名' },
  { value: 'copy', label: '复制' },
]
const cases = [
  { label: '点击', options: { trigger: ['click'] } },
  { label: '悬停', options: { trigger: ['hover'] } },
  { label: '聚焦', options: { trigger: ['focus'] } },
  { label: '悬停 + 聚焦', options: { trigger: ['hover', 'focus'] } },
  { label: '悬停延迟', options: { trigger: ['hover'], hoverOpenDelay: 300, hoverCloseDelay: 400 } },
]
</script>
<template>
  <div class="flex min-h-64 flex-wrap items-center justify-center gap-3 p-6">
    <Dropdown
      v-for="item in cases"
      :key="item.label"
      :items="items"
      :popover-props="item.options"
      >{{ item.label }}</Dropdown
    >
  </div>
</template>
