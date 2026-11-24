<script setup lang="ts">
import { Button } from '@fex-design/vue/ui/button'
import { ref } from 'vue'
import { MenuRoot, MenuContent, MenuItem } from '@fex-design/vue/primitive/menu'
import { menuSelectionItems } from '@fex-design/docs-shared/menu-demo'
const multiple = ref(false),
  value = ref(['users'])
function toggle() {
  multiple.value = !multiple.value
  if (!multiple.value) value.value = value.value.slice(0, 1)
}
</script>
<template>
  <div class="grid w-full max-w-xs gap-3">
    <div class="flex gap-2">
      <Button @click="toggle">切换单选 / 多选</Button
      ><Button
        @click="
          multiple = false
          value = ['users']
        "
        >重置</Button
      >
    </div>
    <MenuRoot layout="inline" :multiple="multiple" v-model:value="value"
      ><MenuContent
        ><MenuItem
          v-for="item in menuSelectionItems"
          :key="item.value"
          :value="item.value"
          :disabled="item.disabled"
          >{{ item.label }}</MenuItem
        ></MenuContent
      ></MenuRoot
    >
    <output>multiple: {{ multiple }}; value: {{ JSON.stringify(value) }}</output>
  </div>
</template>
