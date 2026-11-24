<script setup lang="ts">
import { provide, useId } from 'vue'
import type { DropdownRootOptions } from '@fex-design/core/dropdown/types'
import type { MenuActivateInfo, MenuChangeInfo } from '@fex-design/core/menu/types'
import type { PopoverChangeInfo } from '@fex-design/core/popover/types'
import { popoverKey } from '../popover/context'
import { menuKey, menuLevelKey, subMenuKey } from '../menu/context'
import { dropdownKey } from './context'
import { useDropdown } from './use-dropdown'

defineOptions({ name: 'DropdownRoot' })
const props = withDefaults(
  defineProps<
    Omit<DropdownRootOptions, 'onOpenChange' | 'onActivate'> & {
      value?: readonly string[]
      openValues?: readonly string[]
    }
  >(),
  { open: undefined, defaultOpen: undefined, closeOnSelect: undefined, disabled: undefined },
)
const emit = defineEmits<{
  'update:open': [open: boolean]
  openChange: [open: boolean, info: PopoverChangeInfo]
  'update:value': [value: string[]]
  valueChange: [value: string[], info: MenuChangeInfo]
  'update:openValues': [value: string[]]
  menuOpenChange: [value: string[], info: MenuChangeInfo]
  activate: [info: MenuActivateInfo]
  activated: [info: MenuChangeInfo]
}>()
const { controller, popover } = useDropdown(() => ({
  popoverProps: {
    ...props.popoverProps,
    open: props.open,
    defaultOpen: props.defaultOpen,
    disabled: props.disabled,
    onOpenChange: (open, info) => {
      emit('update:open', open)
      emit('openChange', open, info)
    },
  },
  menuProps: {
    ...props.menuProps,
    disabled: props.disabled,
    value: props.value ?? props.menuProps?.value,
    openValues: props.openValues ?? props.menuProps?.openValues,
    onActivate: (info) => emit('activate', info),
    onActivated: (info) => {
      props.menuProps?.onActivated?.(info)
      emit('activated', info)
    },
    onValueChange: (value, info) => {
      props.menuProps?.onValueChange?.(value, info)
      emit('update:value', value)
      emit('valueChange', value, info)
    },
    onOpenChange: (value, info) => {
      props.menuProps?.onOpenChange?.(value, info)
      emit('update:openValues', value)
      emit('menuOpenChange', value, info)
    },
  },
  closeOnSelect: props.closeOnSelect,
}))
const generatedTriggerId = useId()
provide(dropdownKey, {
  controller,
  triggerId: generatedTriggerId,
  get disabled() {
    return Boolean(props.disabled)
  },
})
provide(popoverKey, popover)
provide(menuKey, controller.dom)
provide(menuLevelKey, undefined)
provide(subMenuKey, undefined)
defineExpose({ controller })
</script>
<template><slot /></template>
