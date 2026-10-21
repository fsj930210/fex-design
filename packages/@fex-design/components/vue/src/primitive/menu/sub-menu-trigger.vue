<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue'
import { ChevronRightIcon } from '@fex-design/vue/icons/chevron'
import { menuItemClassName, menuExpandIconClassName } from '@fex-design/components-styles/menu'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
import { cn } from '@fex-design/utils'
import { subMenuKey, useMenuContext } from './context'
import { useMenuHost } from './use-menu-host'
defineOptions({ name: 'SubMenuTrigger', inheritAttrs: false })
const props = defineProps<{ disabled?: boolean | undefined; textValue?: string | undefined }>()
const attrs = useAttrs(),
  dom = useMenuContext(),
  branch = inject(subMenuKey)
if (!branch) throw new Error('SubMenuTrigger requires SubMenu')
const snapshot = useCoreStore(dom.controller)
const host = useMenuHost((element) =>
  dom.bindItem(element, () => ({ value: branch.value(), ...props }), branch.parent, branch),
)
const state = computed(() => ({
  disabled: snapshot.value.disabled || Boolean(props.disabled),
  open:
    !snapshot.value.disabled &&
    !props.disabled &&
    snapshot.value.openValues.includes(branch.value()),
}))
function hostProps() {
  return {
    ...attrs,
    type: 'button' as const,
    role: 'menuitem',
    tabindex: -1,
    disabled: state.value.disabled,
    'aria-haspopup': 'menu' as const,
    'aria-expanded': state.value.open,
    'data-slot': 'submenu-trigger',
    class: cn(
      menuItemClassName({
        orientation:
          !branch.parent && snapshot.value.layout === 'horizontal' ? 'horizontal' : 'vertical',
      }),
      attrs.class as string | undefined,
    ),
  }
}
defineSlots<{
  default(): unknown
  indicator(): unknown
  trigger(binding: {
    props: ReturnType<typeof hostProps>
    ref: typeof host
    state: typeof state.value
  }): unknown
}>()
</script>
<template>
  <slot v-if="$slots.trigger" name="trigger" :props="hostProps()" :ref="host" :state="state" />
  <button v-else v-bind="hostProps()" :ref="host">
    <slot /><span :class="menuExpandIconClassName"
      ><slot name="indicator"><ChevronRightIcon /></slot
    ></span>
  </button>
</template>
