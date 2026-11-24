<script setup lang="ts">
import { ref } from 'vue'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/vue/primitive/dropdown'
import { MenuItem } from '@fex-design/vue/primitive/menu'
import { Button } from '@fex-design/vue/primitive/button'
const disabled = ref(false)
</script>
<template>
  <div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <Button @click="disabled = !disabled">切换禁用</Button>
    <DropdownRoot :disabled="disabled">
      <DropdownTrigger v-slot="trigger"
        ><Button v-bind="trigger.props" :ref="trigger.ref">操作</Button></DropdownTrigger
      >
      <DropdownPortal
        ><DropdownContent>
          <MenuItem value="rename">重命名</MenuItem><MenuItem value="duplicate">复制</MenuItem>
        </DropdownContent></DropdownPortal
      >
    </DropdownRoot>
    <output>触发器状态：{{ disabled ? '禁用' : '启用' }}</output>
  </div>
</template>
