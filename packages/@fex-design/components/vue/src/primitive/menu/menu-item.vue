<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue'
import { menuItemClassName } from '@fex-design/components-styles/menu'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
import { cn } from '@fex-design/utils'
import { menuLevelKey, useMenuContext } from './context'
import { useMenuHost } from './use-menu-host'
defineOptions({ name: 'MenuItem', inheritAttrs: false })
const props = defineProps<{
  value: string
  disabled?: boolean | undefined
  textValue?: string | undefined
}>()
const attrs = useAttrs(),
  dom = useMenuContext(),
  parent = inject(menuLevelKey, undefined)
const snapshot = useCoreStore(dom.controller)
const host = useMenuHost((element) => dom.bindItem(element, () => ({ ...props }), parent))
const state = computed(() => ({
  disabled: snapshot.value.disabled || Boolean(props.disabled),
  selected: snapshot.value.value.includes(props.value),
}))
// Read attrs during rendering; useAttrs itself is not a reactive dependency.
function hostProps() {
  return {
    ...attrs,
    type: 'button' as const,
    role: 'menuitem',
    tabindex: -1,
    disabled: state.value.disabled,
    'data-slot': 'menu-item',
    class: cn(
      menuItemClassName({
        orientation: !parent && snapshot.value.layout === 'horizontal' ? 'horizontal' : 'vertical',
      }),
      attrs.class as string | undefined,
    ),
  }
}
defineSlots<{
  default(): unknown
  trigger(binding: {
    props: ReturnType<typeof hostProps>
    ref: typeof host
    state: typeof state.value
  }): unknown
}>()
</script>
<template>
  <slot v-if="$slots.trigger" name="trigger" :props="hostProps()" :ref="host" :state="state" />
  <button v-else v-bind="hostProps()" :ref="host"><slot /></button>
</template>
