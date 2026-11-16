<script setup lang="ts">
import {
  createDialogController,
  type DialogOptions,
} from '@fex-design/core/dialog/create-dialog-controller'
import { computed, onBeforeUnmount, provide, ref, shallowRef, watch } from 'vue'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
import { dialogKey, type DialogRootProps } from './context'

let nextDialogId = 1
const props = withDefaults(defineProps<DialogRootProps>(), {
  closeDelay: 140,
  defaultOpen: false,
  closeOnEscape: true,
  closeOnOverlayClick: false,
  modal: true,
})
const emit = defineEmits<{
  openChange: [open: boolean, info: Parameters<NonNullable<DialogOptions['onOpenChange']>>[1]]
}>()
const controlled = computed(() => props.open !== undefined)
const localOpen = ref(props.defaultOpen)
const fullscreenActive = ref(props.fullscreen === true)
const triggerElement = shallowRef<HTMLButtonElement | null>(null)
const dialogId = nextDialogId++
function createOptions(): DialogOptions {
  return {
    ...props,
    open: controlled.value ? Boolean(props.open) : localOpen.value,
    onOpenChange(nextOpen, info) {
      if (!nextOpen) fullscreenActive.value = false
      if (!controlled.value) localOpen.value = nextOpen
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
  () => [props.defaultOpen, props.fullscreen, props.modal, props.closeDelay, props.closeOnEscape, props.closeOnOverlayClick],
  syncOptions,
  { flush: 'sync' },
)
provide(dialogKey, {
  contentId: `dialog-content-${dialogId}`,
  dialog,
  modal: props.modal,
  fullscreen: props.fullscreen,
  fullscreenActive,
  onFullscreenChange: props.onFullscreenChange,
  snapshot,
  titleId: `dialog-title-${dialogId}`,
  triggerElement,
})
onBeforeUnmount(() => dialog.destroy())
</script>
<template><slot /></template>




