<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown } from '@fex-design/vue/ui/dropdown'
const value = ref('尚未选择')
const container = ref<HTMLElement | null>(null)
const popoverProps = { getPopupContainer: () => container.value }
const items = [
  { value: 'rename', label: '重命名' },
  { value: 'duplicate', label: '复制' },
  { value: 'archive', label: '归档', disabled: true },
]
</script>
<template>
  <div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <div
      ref="container"
      class="[--popover-background:#f5f3ff] [--popover-border:#8b5cf6] [--popover-foreground:#4c1d95] [--menu-item-hover-background:#ddd6fe]"
    >
      <Dropdown
        :items="items"
        :popover-props="popoverProps"
        @activate="(info) => (value = info.value)"
        >操作</Dropdown
      >
    </div>
    <output>最近操作：{{ value }}</output>
  </div>
</template>
