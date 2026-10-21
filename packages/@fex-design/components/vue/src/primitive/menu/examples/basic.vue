<script setup lang="ts">
import { MenuRoot, MenuContent, MenuItem } from '@fex-design/vue/primitive/menu'
import { ref } from 'vue'
const value = ref<string[]>([])
</script>
<template>
  <div class="grid w-full max-w-xs gap-3">
    <MenuRoot @value-change="(next) => (value = next)">
      <MenuContent aria-label="基本菜单"
        ><MenuItem value="overview">概览</MenuItem>
        <MenuItem value="members">成员</MenuItem>
        <MenuItem value="billing" disabled>账单</MenuItem></MenuContent
      >
    </MenuRoot>
    <output>选中值：{{ JSON.stringify(value) }}</output>
  </div>
</template>
