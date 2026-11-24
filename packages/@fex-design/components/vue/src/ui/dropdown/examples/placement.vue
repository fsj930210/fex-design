<script setup lang="ts">
import { Dropdown } from '@fex-design/vue/ui/dropdown'
const items = [
  { value: 'rename', label: '重命名' },
  { value: 'copy', label: '复制' },
]
const placements = [
  'topLeft',
  'top',
  'topRight',
  'leftTop',
  'rightTop',
  'left',
  'right',
  'leftBottom',
  'rightBottom',
  'bottomLeft',
  'bottom',
  'bottomRight',
]
const positions = [
  'col-start-2 row-start-1',
  'col-start-3 row-start-1',
  'col-start-4 row-start-1',
  'col-start-1 row-start-2',
  'col-start-5 row-start-2',
  'col-start-1 row-start-3',
  'col-start-5 row-start-3',
  'col-start-1 row-start-4',
  'col-start-5 row-start-4',
  'col-start-2 row-start-5',
  'col-start-3 row-start-5',
  'col-start-4 row-start-5',
]
</script>
<template>
  <div class="grid w-full gap-4 p-6">
    <p>四个方向、三种对齐；关闭自动避让以展示所选位置。</p>
    <div
      class="grid grid-cols-[repeat(5,max-content)] grid-rows-[repeat(5,2.25rem)] justify-center gap-3 py-28"
    >
      <div v-for="(placement, index) in placements" :key="placement" :class="positions[index]">
        <Dropdown :items="items" :popover-props="{ placement, avoidCollisions: false }">{{
          placement
        }}</Dropdown>
      </div>
    </div>
  </div>
</template>
