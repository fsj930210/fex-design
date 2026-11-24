<script setup lang="ts">
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/vue/primitive/dropdown'
import { MenuItem, SubMenu, SubMenuTrigger, SubMenuContent } from '@fex-design/vue/primitive/menu'
import { Button } from '@fex-design/vue/primitive/button'
const directions = ['ltr', 'rtl'] as const
</script>
<template>
  <div class="flex min-h-64 flex-wrap justify-around gap-8 p-6">
    <div v-for="dir in directions" :key="dir" :dir="dir" class="flex flex-col items-start gap-3">
      <span>{{ dir.toUpperCase() }}</span
      ><DropdownRoot :menu-props="{ dir }">
        <DropdownTrigger v-slot="trigger"
          ><Button v-bind="trigger.props" :ref="trigger.ref">操作</Button></DropdownTrigger
        >
        <DropdownPortal
          ><DropdownContent
            ><MenuItem value="rename">重命名</MenuItem>
            <SubMenu value="share"
              ><SubMenuTrigger>分享</SubMenuTrigger
              ><SubMenuContent><MenuItem value="link">复制链接</MenuItem></SubMenuContent></SubMenu
            >
          </DropdownContent></DropdownPortal
        >
      </DropdownRoot>
    </div>
  </div>
</template>
