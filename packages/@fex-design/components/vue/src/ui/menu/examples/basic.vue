<script setup lang="ts">
import { Menu } from '@fex-design/vue/ui/menu'
import { ref } from 'vue'
const value = ref<string[]>([])
const items = [
  { value: 'overview', label: '概览' },
  { value: 'members', label: '成员' },
  { value: 'billing', label: '账单', disabled: true },
]
</script>
<template>
  <div class="grid w-full max-w-xs gap-3">
    <Menu @value-change="(next) => (value = next)" :items="items" aria-label="基本菜单" />
    <output>选中值：{{ JSON.stringify(value) }}</output>
  </div>
</template>
