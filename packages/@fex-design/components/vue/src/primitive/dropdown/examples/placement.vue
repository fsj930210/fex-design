<script setup lang="ts">
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/vue/primitive/dropdown'
import { MenuItem } from '@fex-design/vue/primitive/menu'
import { Button } from '@fex-design/vue/primitive/button'
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
] as const
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
        <DropdownRoot :popover-props="{ placement, avoidCollisions: false }">
          <DropdownTrigger v-slot="trigger"
            ><Button v-bind="trigger.props" :ref="trigger.ref">{{
              placement
            }}</Button></DropdownTrigger
          >
          <DropdownPortal
            ><DropdownContent
              ><MenuItem value="rename">重命名</MenuItem
              ><MenuItem value="copy">复制</MenuItem></DropdownContent
            ></DropdownPortal
          >
        </DropdownRoot>
      </div>
    </div>
  </div>
</template>
