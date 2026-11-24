<script setup lang="ts">
import { ref } from 'vue'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/vue/primitive/dropdown'
import { MenuItem, type MenuActivateInfo } from '@fex-design/vue/primitive/menu'
import { Button } from '@fex-design/vue/primitive/button'
const value = ref('尚未选择')
function activate(info: MenuActivateInfo) {
  value.value = info.value
}
</script>
<template>
  <div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <DropdownRoot @activate="activate">
      <DropdownTrigger v-slot="trigger"
        ><Button v-bind="trigger.props" :ref="trigger.ref">操作</Button></DropdownTrigger
      >
      <DropdownPortal
        ><DropdownContent
          style="
            --popover-background: #f5f3ff;
            --popover-border: #8b5cf6;
            --popover-foreground: #4c1d95;
            --menu-item-hover-background: #ddd6fe;
          "
        >
          <MenuItem value="rename">重命名</MenuItem>
          <MenuItem value="duplicate">复制</MenuItem>
          <MenuItem value="archive" disabled>归档</MenuItem>
        </DropdownContent></DropdownPortal
      >
    </DropdownRoot>
    <output>最近操作：{{ value }}</output>
  </div>
</template>
