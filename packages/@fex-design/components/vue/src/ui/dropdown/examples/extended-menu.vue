<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@fex-design/vue/ui/button'
import { Dropdown } from '@fex-design/vue/ui/dropdown'
const extended = ref(true)
const selected = ref('尚未选择')
const items = ref<any[]>([])
function updateItems() {
  items.value = [
    { value: 'edit', label: '编辑' },
    { value: 'copy', label: '复制' },
    ...(extended.value
      ? [
          { type: 'separator', key: 'line' },
          {
            type: 'group',
            key: 'extra',
            label: '扩展操作',
            children: [
              { value: 'archive', label: '归档' },
              { value: 'export', label: '导出' },
            ],
          },
        ]
      : []),
  ]
}
updateItems()
function toggle() {
  extended.value = !extended.value
  updateItems()
}
</script>
<template>
  <div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <Button @click="toggle">{{ extended ? '隐藏' : '显示' }}扩展操作</Button
    ><Dropdown :items="items" @activate="(info) => (selected = info.value)">操作</Dropdown
    ><output>最近操作：{{ selected }}</output>
  </div>
</template>
