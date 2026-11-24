<script setup lang="ts">
import { useAttrs } from 'vue'
import { PopoverTrigger } from '../popover'
import { useDropdownContext } from './context'

defineOptions({ name: 'DropdownTrigger', inheritAttrs: false })
const attrs = useAttrs()
const context = useDropdownContext()
function keydown(event: KeyboardEvent) {
  const handlers = attrs.onKeydown
  for (const handler of Array.isArray(handlers) ? handlers : [handlers]) {
    if (typeof handler === 'function') handler(event)
  }
  if (!event.defaultPrevented) context.controller.triggerKeyDown(event)
}
</script>
<template>
  <PopoverTrigger v-bind="attrs" v-slot="slot">
    <slot
      :props="{
        ...slot.props,
        id: context.triggerId,
        'data-dropdown-trigger': '',
        'aria-haspopup': 'menu',
        'aria-disabled': context.disabled || slot.props['aria-disabled'],
        onKeydown: keydown,
      }"
      :ref="slot.ref"
      :state="slot.state"
    />
  </PopoverTrigger>
</template>
