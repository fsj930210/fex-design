<script setup lang="ts">
import { drawerCloseClassName } from '@fex-design/components-styles/drawer'
import { cn } from '@fex-design/utils'
import { XIcon } from '@fex-design/vue/icons/x'
import { useDrawerContext } from './context'
const props = defineProps<{ class?: string }>()
const { drawer } = useDrawerContext('DrawerClose')
function click(e: MouseEvent) {
  if (!e.defaultPrevented) drawer.close({ source: 'close-button', event: e })
}
</script>
<template>
  <button
    v-bind="$attrs"
    type="button"
    aria-label="Close"
    data-slot="drawer-close"
    :class="cn(drawerCloseClassName, props.class)"
    @click="click"
  >
    <slot><XIcon class="size-4" /></slot>
  </button>
</template>
