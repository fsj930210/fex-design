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
const open = ref(false)
const uncontrolledOpen = ref(false)
</script>
<template>
  <div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <Button @click="open = !open">外部切换</Button>
    <DropdownRoot v-model:open="open">
      <DropdownTrigger v-slot="trigger"
        ><Button v-bind="trigger.props" :ref="trigger.ref">受控菜单</Button></DropdownTrigger
      >
      <DropdownPortal
        ><DropdownContent>
          <MenuItem value="rename">重命名</MenuItem><MenuItem value="duplicate">复制</MenuItem>
        </DropdownContent></DropdownPortal
      >
    </DropdownRoot>
    <output>菜单状态：{{ open ? '打开' : '关闭' }}</output>
    <DropdownRoot :default-open="false" @open-change="uncontrolledOpen = $event">
      <DropdownTrigger v-slot="trigger"
        ><Button v-bind="trigger.props" :ref="trigger.ref">非受控菜单</Button></DropdownTrigger
      >
      <DropdownPortal
        ><DropdownContent>
          <MenuItem value="rename">重命名</MenuItem><MenuItem value="duplicate">复制</MenuItem>
        </DropdownContent></DropdownPortal
      >
    </DropdownRoot>
    <output>非受控菜单状态：{{ uncontrolledOpen ? '打开' : '关闭' }}</output>
  </div>
</template>
