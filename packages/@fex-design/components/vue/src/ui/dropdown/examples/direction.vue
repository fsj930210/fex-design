<script setup lang="ts">
import { Dropdown } from '@fex-design/vue/ui/dropdown'
const items = [
  { value: 'rename', label: '重命名' },
  { value: 'share', label: '分享', children: [{ value: 'link', label: '复制链接' }] },
]
const dirs = ['ltr', 'rtl']
</script>
<template>
  <div class="flex min-h-64 flex-wrap justify-around gap-8 p-6">
    <div v-for="dir in dirs" :key="dir" :dir="dir" class="flex flex-col items-start gap-3">
      <span>{{ dir.toUpperCase() }}</span
      ><Dropdown :items="items" :menu-props="{ dir }">操作</Dropdown>
    </div>
  </div>
</template>
