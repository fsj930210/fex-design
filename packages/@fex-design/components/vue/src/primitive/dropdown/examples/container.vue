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
const container = ref<HTMLDivElement | null>(null)
</script>
<template>
  <div class="grid gap-3 p-6">
    <p>浮层挂载到虚线区域，定位仍以触发器为参照。</p>
    <div ref="container" class="relative min-h-48 rounded-lg border-2 border-dashed p-6">
      <DropdownRoot
        ><DropdownTrigger v-slot="trigger"
          ><Button v-bind="trigger.props" :ref="trigger.ref">操作</Button></DropdownTrigger
        >
        <DropdownPortal :container="container"
          ><DropdownContent>
            <MenuItem value="rename">重命名</MenuItem><MenuItem value="duplicate">复制</MenuItem>
          </DropdownContent></DropdownPortal
        >
      </DropdownRoot>
    </div>
  </div>
</template>
