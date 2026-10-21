<script setup lang="ts">
import type { VNodeChild } from 'vue'
import { ChevronRightIcon } from '@fex-design/vue/icons/chevron'
import {
  menuItemIconClassName,
  menuItemLabelClassName,
  menuItemSuffixClassName,
  menuExpandIconClassName,
} from '@fex-design/components-styles/menu'
import { MenuValue } from './menu-value'
defineOptions({ name: 'MenuItemContent' })
// Both omitted props and forwarded undefined must retain the default indicator.
withDefaults(
  defineProps<{
    icon?: VNodeChild
    suffix?: VNodeChild
    indicator?: VNodeChild
    submenu?: boolean
  }>(),
  {
    icon: undefined,
    suffix: undefined,
    indicator: undefined,
  },
)
</script>
<template>
  <span
    v-if="$slots.icon || (icon != null && icon !== false)"
    data-slot="menu-icon"
    :class="menuItemIconClassName"
    ><slot name="icon"><MenuValue :value="icon" /></slot
  ></span>
  <span data-slot="menu-item-content" :class="menuItemLabelClassName"><slot /></span>
  <span
    v-if="$slots.suffix || (suffix != null && suffix !== false)"
    data-slot="menu-suffix"
    :class="menuItemSuffixClassName"
    ><slot name="suffix"><MenuValue :value="suffix" /></slot
  ></span>
  <span
    v-if="submenu && indicator !== false && indicator !== null"
    data-slot="submenu-indicator"
    :class="menuExpandIconClassName"
    ><slot name="indicator"
      ><MenuValue v-if="indicator !== undefined" :value="indicator" /><ChevronRightIcon
        v-else /></slot
  ></span>
</template>
