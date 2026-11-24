<script setup lang="ts">
import { provide } from 'vue'
import type {
  PopoverChangeInfo,
  PopoverCloseAutoFocusEvent,
  PopoverOpenAutoFocusEvent,
  PopoverOptions,
} from '@fex-design/core/popover/types'
import { popoverKey } from './context'
import { usePopover } from './use-popover'

defineOptions({ name: 'Popover' })
const props = withDefaults(
  defineProps<Omit<PopoverOptions, 'onOpenChange' | 'onOpenAutoFocus' | 'onCloseAutoFocus'>>(),
  {
    open: undefined,
    defaultOpen: undefined,
    arrow: undefined,
    disabled: undefined,
    avoidCollisions: undefined,
    hideWhenDetached: undefined,
    lazyMount: undefined,
    destroyOnHidden: undefined,
    matchReferenceWidth: undefined,
  },
)
const emit = defineEmits<{
  'update:open': [open: boolean]
  openChange: [open: boolean, info: PopoverChangeInfo]
  openAutoFocus: [event: PopoverOpenAutoFocusEvent]
  closeAutoFocus: [event: PopoverCloseAutoFocusEvent]
}>()
function onOpenChange(open: boolean, info: PopoverChangeInfo) {
  emit('update:open', open)
  emit('openChange', open, info)
}
const context = usePopover(() => ({
  ...props,
  onOpenChange,
  onOpenAutoFocus: (event) => emit('openAutoFocus', event),
  onCloseAutoFocus: (event) => emit('closeAutoFocus', event),
}))
const { overlay, snapshot } = context
provide(popoverKey, context)
defineExpose({ overlay })
</script>

<template>
  <slot :open="snapshot.open" :close="overlay.close" />
</template>
