<script setup lang="ts">
import { ref } from 'vue'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/vue/primitive/dropdown'
import {
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
  type MenuActivateInfo,
} from '@fex-design/vue/primitive/menu'
import { Button } from '@fex-design/vue/primitive/button'
const value = ref('尚未选择')
function activate(info: MenuActivateInfo) {
  value.value = info.value
}
</script>
<template>
  <div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <DropdownRoot
      :popoverProps="{ trigger: ['hover'], hoverCloseDelay: 180 }"
      :menuProps="{ submenuTrigger: 'hover' }"
      @activate="activate"
    >
      <DropdownTrigger v-slot="trigger"
        ><Button v-bind="trigger.props" :ref="trigger.ref">操作</Button></DropdownTrigger
      >
      <DropdownPortal
        ><DropdownContent>
          <MenuItem value="rename">重命名</MenuItem>
          <SubMenu value="share"
            ><SubMenuTrigger>分享</SubMenuTrigger
            ><SubMenuContent>
              <MenuItem value="link">复制链接</MenuItem>
              <SubMenu value="send"
                ><SubMenuTrigger>发送到</SubMenuTrigger
                ><SubMenuContent>
                  <MenuItem value="email">电子邮件</MenuItem>
                </SubMenuContent></SubMenu
              >
            </SubMenuContent></SubMenu
          >
        </DropdownContent></DropdownPortal
      > </DropdownRoot
    ><output>最近操作：{{ value }}</output>
  </div>
</template>
