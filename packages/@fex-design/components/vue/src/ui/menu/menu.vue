<script setup lang="ts">
import { computed, useSlots, useAttrs, type StyleValue } from 'vue'
import { cn } from '@fex-design/utils'
import { MenuRoot, MenuContent } from '@fex-design/vue/primitive/menu'
import { assertMenuContent } from '@fex-design/core/menu/items'
import type { MenuOptions, MenuChangeInfo, MenuActivateInfo } from '@fex-design/core/menu/types'
import type { MenuItemData, MenuItemBinding, MenuClassNames, MenuStyles } from './types'
import MenuItems from './menu-items.vue'
defineOptions({ name: 'Menu', inheritAttrs: false })
const props = defineProps<
  Omit<MenuOptions, 'onValueChange' | 'onOpenChange' | 'onActivate'> & {
    items?: readonly MenuItemData[]
    classNames?: MenuClassNames | undefined
    styles?: MenuStyles | undefined
  }
>()
const attrs = useAttrs()
function nativeAttrs() {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
}
const slots = useSlots()
const options = computed(() => {
  const { items, classNames, styles, ...rest } = props
  return rest
})
function resolvedItems() {
  assertMenuContent(props.items, Boolean(slots.default))
  return props.items
}
const emit = defineEmits<{
  'update:value': [value: string[]]
  'update:openValues': [value: string[]]
  valueChange: [value: string[], info: MenuChangeInfo]
  openChange: [value: string[], info: MenuChangeInfo]
  activate: [info: MenuActivateInfo]
}>()
defineSlots<{
  default(): unknown
  item(binding: MenuItemBinding & { item: MenuItemData }): unknown
}>()
</script>
<template>
  <MenuRoot
    v-bind="options"
    @update:value="emit('update:value', $event)"
    @update:open-values="emit('update:openValues', $event)"
    @value-change="(value, info) => emit('valueChange', value, info)"
    @open-change="(value, info) => emit('openChange', value, info)"
    @activate="emit('activate', $event)"
  >
    <MenuContent
      v-bind="nativeAttrs()"
      :class="cn(classNames?.root, attrs.class as string | undefined)"
      :style="[styles?.root, attrs.style as StyleValue]"
    >
      <MenuItems
        v-if="resolvedItems() !== undefined"
        :items="resolvedItems()!"
        :class-names="classNames"
        :styles="styles"
      >
        <template v-if="$slots.item" #item="binding"
          ><slot name="item" v-bind="binding"
        /></template>
      </MenuItems>
      <slot v-else />
    </MenuContent>
  </MenuRoot>
</template>
