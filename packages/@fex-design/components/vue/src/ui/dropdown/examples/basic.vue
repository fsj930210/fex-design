<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown } from '@fex-design/vue/ui/dropdown'
const value = ref('尚未选择')
const items = [
  { value: 'rename', label: '重命名' },
  { value: 'duplicate', label: '复制' },
  { value: 'archive', label: '归档', disabled: true },
]
</script>
<template>
  <div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <Dropdown :items="items" @activate="(info) => (value = info.value)">操作</Dropdown
    ><output>最近操作：{{ value }}</output>
  </div>
</template>
