<script setup lang="ts">
import { h, useSlots, type VNodeChild } from 'vue'
import { MenuItem as PrimitiveItem } from '@fex-design/vue/primitive/menu'
import MenuItemContent from './menu-item-content.vue'
import type { MenuItemBinding } from './types'
defineOptions({ name: 'MenuItem', inheritAttrs: false })
const props = withDefaults(
  defineProps<{
    value: string
    disabled?: boolean | undefined
    textValue?: string | undefined
    icon?: VNodeChild
    suffix?: VNodeChild
    href?: string | undefined
    target?: string | undefined
    rel?: string | undefined
  }>(),
  {
    icon: undefined,
    suffix: undefined,
  },
)
const slots = useSlots()
// Custom hosts receive the same assembled vnode as the default host.
function content() {
  return h(
    MenuItemContent,
    { icon: props.icon, suffix: props.suffix },
    { default: slots.default, icon: slots.icon, suffix: slots.suffix },
  )
}
defineSlots<{
  default(): unknown
  icon(): unknown
  suffix(): unknown
  trigger(binding: MenuItemBinding): unknown
}>()
</script>
<template>
  <PrimitiveItem v-bind="$attrs" :value="value" :disabled="disabled" :text-value="textValue">
    <template #trigger="binding">
      <slot v-if="$slots.trigger" name="trigger" v-bind="binding" :content="content()" />
      <a
        v-else-if="href !== undefined"
        v-bind="binding.props"
        :ref="binding.ref"
        :href="href"
        :target="target"
        :rel="rel"
        ><component :is="content()"
      /></a>
      <button v-else v-bind="binding.props" :ref="binding.ref">
        <component :is="content()" />
      </button>
    </template>
  </PrimitiveItem>
</template>
