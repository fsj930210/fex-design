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
const selected = ref('尚未选择')
function activate(info: MenuActivateInfo) {
  selected.value = info.value
}
</script>
<template>
  <div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <DropdownRoot @activate="activate">
      <DropdownTrigger v-slot="trigger"
        ><Button v-bind="trigger.props" :ref="trigger.ref">选择操作</Button></DropdownTrigger
      >
      <DropdownPortal
        ><DropdownContent>
          <MenuItem
            value="edit"
            text-value="编辑"
            class="flex h-[var(--menu-item-height)] items-center justify-between gap-6 px-[var(--menu-item-padding-x)] text-sm"
            ><template #trigger="item"
              ><button v-bind="item.props" :ref="item.ref">
                <span>编辑资料</span><kbd>⌘ E</kbd>
              </button></template
            ></MenuItem
          >
          <MenuItem
            value="archive"
            text-value="归档"
            class="flex h-[var(--menu-item-height)] items-center justify-between gap-6 px-[var(--menu-item-padding-x)] text-sm"
            ><template #trigger="item"
              ><button v-bind="item.props" :ref="item.ref">
                <span>归档项目</span><kbd>⌘ A</kbd>
              </button></template
            ></MenuItem
          >
        </DropdownContent></DropdownPortal
      > </DropdownRoot
    ><output>最近操作：{{ selected }}</output>
  </div>
</template>
