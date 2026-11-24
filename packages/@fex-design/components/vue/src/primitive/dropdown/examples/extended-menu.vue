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
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
  type MenuActivateInfo,
} from '@fex-design/vue/primitive/menu'
import { Button } from '@fex-design/vue/primitive/button'
const extended = ref(true)
const selected = ref('尚未选择')
function activate(info: MenuActivateInfo) {
  selected.value = info.value
}
</script>
<template>
  <div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <Button @click="extended = !extended">{{ extended ? '隐藏' : '显示' }}扩展操作</Button>
    <DropdownRoot @activate="activate"
      ><DropdownTrigger v-slot="trigger"
        ><Button v-bind="trigger.props" :ref="trigger.ref">操作</Button></DropdownTrigger
      >
      <DropdownPortal
        ><DropdownContent
          ><MenuItem value="edit">编辑</MenuItem><MenuItem value="copy">复制</MenuItem>
          <template v-if="extended"
            ><MenuSeparator /><MenuGroup
              ><MenuGroupLabel>扩展操作</MenuGroupLabel><MenuItem value="archive">归档</MenuItem
              ><MenuItem value="export">导出</MenuItem></MenuGroup
            ></template
          >
        </DropdownContent></DropdownPortal
      > </DropdownRoot
    ><output>最近操作：{{ selected }}</output>
  </div>
</template>
