<script setup lang="ts">
import { h, useSlots, type VNodeChild } from 'vue'
import { SubMenuTrigger as PrimitiveTrigger } from '@fex-design/vue/primitive/menu'
import MenuItemContent from './menu-item-content.vue'
import type { MenuItemBinding } from './types'
defineOptions({ name: 'SubMenuTrigger', inheritAttrs: false })
// VNodeChild includes boolean; preserve omission instead of Vue casting it to false.
const props = withDefaults(
  defineProps<{
    disabled?: boolean | undefined
    textValue?: string | undefined
    icon?: VNodeChild
    suffix?: VNodeChild
    indicator?: VNodeChild
  }>(),
  {
    icon: undefined,
    suffix: undefined,
    indicator: undefined,
  },
)
const slots = useSlots()
// The vnode factory carries default content into a custom native-host slot.
function content() {
  return h(
    MenuItemContent,
    { icon: props.icon, suffix: props.suffix, indicator: props.indicator, submenu: true },
    { default: slots.default, icon: slots.icon, suffix: slots.suffix, indicator: slots.indicator },
  )
}
defineSlots<{
  default(): unknown
  icon(): unknown
  suffix(): unknown
  indicator(): unknown
  trigger(binding: MenuItemBinding): unknown
}>()
</script>
<template>
  <PrimitiveTrigger v-bind="$attrs" :disabled="disabled" :text-value="textValue">
    <template #trigger="binding">
      <slot v-if="$slots.trigger" name="trigger" v-bind="binding" :content="content()" />
      <button v-else v-bind="binding.props" :ref="binding.ref">
        <component :is="content()" />
      </button>
    </template>
  </PrimitiveTrigger>
</template>
