<script setup lang="ts">
import { inject, provide, watchEffect } from 'vue'
import { createMenuBranch } from '@fex-design/core/menu/branch'
import type { MenuPopoverProps } from './popover-types'
import { menuLevelKey, subMenuKey, useMenuContext } from './context'
defineOptions({ name: 'SubMenu', inheritAttrs: false })
const props = defineProps<{ value: string; popoverProps?: MenuPopoverProps | undefined }>()
const dom = useMenuContext(),
  parent = inject(menuLevelKey, undefined)
provide(
  subMenuKey,
  createMenuBranch(() => props, parent),
)
// Reactive popup configuration synchronizes the external DOM controller.
watchEffect(
  () => {
    props.value
    Object.values(props.popoverProps ?? {})
    dom.refresh()
  },
  { flush: 'post' },
)
</script>
<template><slot /></template>
