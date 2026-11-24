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
const message = ref('尚未操作')
const selected = ref<string[]>([])
function activate(info: MenuActivateInfo) {
  if (info.value === 'cancel') {
    info.preventDefault()
    message.value = '激活已取消'
    return
  }
  message.value = '已选择，菜单保持打开'
}
</script>
<template>
  <div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <DropdownRoot v-model:value="selected" :close-on-select="false" @activate="activate">
      <DropdownTrigger v-slot="trigger"
        ><Button v-bind="trigger.props" :ref="trigger.ref">操作</Button></DropdownTrigger
      >
      <DropdownPortal
        ><DropdownContent
          ><MenuItem value="keep">选择并保持打开</MenuItem>
          <MenuItem value="cancel">取消激活</MenuItem></DropdownContent
        ></DropdownPortal
      > </DropdownRoot
    ><output>{{ message }}；选中：{{ selected.join(', ') || '无' }}</output>
  </div>
</template>
