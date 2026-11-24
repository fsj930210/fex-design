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
const hasItems = ref(true)
</script>
<template>
  <div class="flex min-h-48 flex-col items-start gap-4 p-6">
    <Button @click="hasItems = !hasItems">切换菜单项</Button>
    <DropdownRoot :close-on-select="false"
      ><DropdownTrigger v-slot="trigger"
        ><Button v-bind="trigger.props" :ref="trigger.ref">操作</Button></DropdownTrigger
      >
      <DropdownPortal
        ><DropdownContent :aria-label="hasItems ? '操作菜单' : '操作菜单，无可用操作'">
          <template v-if="hasItems"
            ><MenuItem value="rename">重命名</MenuItem><MenuItem value="duplicate">复制</MenuItem
            ><MenuItem value="clear" @click="hasItems = false">移除菜单项</MenuItem></template
          >
          <span v-else aria-hidden="true" class="px-3 py-2 text-muted-foreground">暂无操作</span>
        </DropdownContent></DropdownPortal
      > </DropdownRoot
    ><output>菜单项：{{ hasItems ? '三个' : '无' }}</output>
  </div>
</template>
