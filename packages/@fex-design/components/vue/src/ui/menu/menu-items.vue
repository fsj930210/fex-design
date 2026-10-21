<script setup lang="ts">
import { SubMenu, SubMenuContent, MenuSeparator } from '@fex-design/vue/primitive/menu'
import { getMenuEntryKey } from '@fex-design/core/menu/items'
import MenuItem from './menu-item.vue'
import SubMenuTrigger from './sub-menu-trigger.vue'
import MenuGroup from './menu-group.vue'
import { MenuValue } from './menu-value'
import type { MenuItemData, MenuClassNames, MenuStyles } from './types'
defineOptions({ name: 'MenuItems' })
defineProps<{
  items: readonly MenuItemData[]
  classNames?: MenuClassNames | undefined
  styles?: MenuStyles | undefined
}>()
</script>
<template>
  <template v-for="entry in items" :key="getMenuEntryKey(entry)">
    <MenuSeparator
      :class="classNames?.separator"
      :style="styles?.separator"
      v-if="entry.type === 'separator'"
    />
    <MenuGroup
      :class="classNames?.group"
      :style="styles?.group"
      v-else-if="entry.type === 'group'"
      :label="entry.label"
    >
      <MenuItems :items="entry.children" :class-names="classNames" :styles="styles"
        ><template v-if="$slots.item" #item="binding"
          ><slot name="item" v-bind="binding" /></template
      ></MenuItems>
    </MenuGroup>
    <SubMenu
      v-else-if="entry.children !== undefined"
      :value="entry.value"
      :popover-props="entry.popoverProps"
    >
      <SubMenuTrigger
        :class="classNames?.subMenuTrigger"
        :style="styles?.subMenuTrigger"
        :disabled="entry.disabled || !entry.children.length"
        :text-value="entry.textValue"
        :icon="entry.icon"
        :suffix="entry.suffix"
        ><MenuValue :value="entry.label"
      /></SubMenuTrigger>
      <SubMenuContent :class="classNames?.subMenuContent" :style="styles?.subMenuContent"
        ><MenuItems :items="entry.children" :class-names="classNames" :styles="styles"
          ><template v-if="$slots.item" #item="binding"
            ><slot name="item" v-bind="binding" /></template></MenuItems
      ></SubMenuContent>
    </SubMenu>
    <MenuItem
      v-else
      :class="classNames?.item"
      :style="styles?.item"
      :value="entry.value"
      :disabled="entry.disabled"
      :text-value="entry.textValue"
      :icon="entry.icon"
      :suffix="entry.suffix"
      :href="entry.href"
      :target="entry.target"
      :rel="entry.rel"
    >
      <MenuValue :value="entry.label" />
      <template v-if="$slots.item" #trigger="binding"
        ><slot name="item" :item="entry" v-bind="binding"
      /></template>
    </MenuItem>
  </template>
</template>
