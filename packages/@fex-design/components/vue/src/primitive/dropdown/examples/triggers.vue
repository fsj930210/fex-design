<script setup lang="ts">
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
  type DropdownPopoverOptions,
} from '@fex-design/vue/primitive/dropdown'
import { MenuItem } from '@fex-design/vue/primitive/menu'
import { Button } from '@fex-design/vue/primitive/button'
const cases: { label: string; options: DropdownPopoverOptions }[] = [
  { label: '点击', options: { trigger: ['click'] } },
  { label: '悬停', options: { trigger: ['hover'] } },
  { label: '聚焦', options: { trigger: ['focus'] } },
  { label: '悬停 + 聚焦', options: { trigger: ['hover', 'focus'] } },
  { label: '悬停延迟', options: { trigger: ['hover'], hoverOpenDelay: 300, hoverCloseDelay: 400 } },
]
</script>
<template>
  <div class="flex min-h-64 flex-wrap items-center justify-center gap-3 p-6">
    <DropdownRoot v-for="item in cases" :key="item.label" :popover-props="item.options">
      <DropdownTrigger v-slot="trigger"
        ><Button v-bind="trigger.props" :ref="trigger.ref">{{
          item.label
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
</template>
