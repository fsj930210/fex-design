<script setup lang="ts">
import {
  createDialogController,
  type DialogOptions,
} from '@fex-design/core/dialog/create-dialog-controller'
import { computed, onBeforeUnmount, provide, ref, shallowRef, toRef, watch } from 'vue'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
import { dialogKey, type DialogRootProps } from './context'

let nextDialogId = 1
const props = withDefaults(defineProps<DialogRootProps>(), {
  closeDelay: 200,
  defaultOpen: false,
  closeOnEscape: true,
  closeOnOverlayClick: true,
  modal: true,
  lazyMount: undefined,
  destroyOnHidden: undefined,
})
const emit = defineEmits<{
  'update:open': [open: boolean]
  openChange: [open: boolean, info: Parameters<NonNullable<DialogOptions['onOpenChange']>>[1]]
}>()
const controlled = computed(() => props.open !== undefined)
const localOpen = ref(props.defaultOpen)
const fullscreenActive = ref(false)
const triggerElement = shallowRef<HTMLButtonElement | null>(null)
const dialogId = nextDialogId++
function createOptions(): DialogOptions {
  return {
    ...props,
    open: controlled.value ? Boolean(props.open) : localOpen.value,
    onOpenChange(nextOpen, info) {
      if (!nextOpen) fullscreenActive.value = false
      if (!controlled.value) localOpen.value = nextOpen
      emit('update:open', nextOpen)
      emit('openChange', nextOpen, info)
    },
  }
}
let latestOptions = createOptions()
const dialog = createDialogController(latestOptions)
const snapshot = useCoreStore(dialog)
function syncOptions() {
  const next = createOptions()
  latestOptions = next
  dialog.setOptions(next)
  return ''
}
watch(() => props.open, syncOptions, { immediate: true, flush: 'sync' })
watch(
  () => [
    props.defaultOpen,
    props.fullscreen,
    props.modal,
    props.closeDelay,
    props.closeOnEscape,
    props.closeOnOverlayClick,
  ],
  syncOptions,
  { flush: 'sync' },
)
const dialogContext = {
  contentId: `dialog-content-${dialogId}`,
  dialog,
  modal: props.modal,
  fullscreen: toRef(props, 'fullscreen'),
  fullscreenActive,
  onFullscreenChange: props.onFullscreenChange,
  snapshot,
  titleId: `dialog-title-${dialogId}`,
  triggerElement,
}
provide(dialogKey, dialogContext)
watch(
  () => props.fullscreen,
  () => {
    syncOptions()
  },
  { deep: true },
)
onBeforeUnmount(() => dialog.destroy())
</script>
<template><slot /></template>
