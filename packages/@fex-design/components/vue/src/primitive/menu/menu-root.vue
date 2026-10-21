<script setup lang="ts">
import { provide } from 'vue'
import type { MenuOptions, MenuChangeInfo, MenuActivateInfo } from '@fex-design/core/menu/types'
import { menuKey, menuLevelKey, subMenuKey } from './context'
import { useMenu } from './use-menu'
defineOptions({ name: 'MenuRoot', inheritAttrs: false })
const props = defineProps<Omit<MenuOptions, 'onValueChange' | 'onOpenChange' | 'onActivate'>>()
const emit = defineEmits<{
  'update:value': [value: string[]]
  'update:openValues': [value: string[]]
  valueChange: [value: string[], info: MenuChangeInfo]
  openChange: [value: string[], info: MenuChangeInfo]
  activate: [info: MenuActivateInfo]
}>()
const binding = useMenu(() => ({
  ...props,
  onValueChange: (value, info) => {
    emit('update:value', value)
    emit('valueChange', value, info)
  },
  onOpenChange: (value, info) => {
    emit('update:openValues', value)
    emit('openChange', value, info)
  },
  onActivate: (info) => emit('activate', info),
}))
provide(menuKey, binding.dom)
provide(menuLevelKey, undefined)
provide(subMenuKey, undefined)
defineExpose(binding)
</script>
<template><slot /></template>
