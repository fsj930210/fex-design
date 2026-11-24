<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown } from '@fex-design/vue/ui/dropdown'
const container = ref<HTMLElement | null>(null)
const items = [
  { value: 'rename', label: '重命名' },
  { value: 'duplicate', label: '复制' },
]
const popoverProps = { getPopupContainer: () => container.value }
</script>
<template>
  <div class="grid gap-3 p-6">
    <p>浮层挂载到虚线区域，定位仍以触发器为参照。</p>
    <div ref="container" class="relative min-h-48 rounded-lg border-2 border-dashed p-6">
      <Dropdown :items="items" :popover-props="popoverProps">操作</Dropdown>
    </div>
  </div>
</template>
