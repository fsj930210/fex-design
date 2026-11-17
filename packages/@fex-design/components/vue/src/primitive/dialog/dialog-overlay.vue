<script setup lang="ts">
import { dialogOverlayClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
import { computed } from 'vue'
import { useDialogContext } from './context'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string }>()
const { dialog, snapshot } = useDialogContext('DialogOverlay')
const overlayClass = computed(() => cn(dialogOverlayClassName, props.class))

function onClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    dialog.close({ reason: 'overlay-pointer', event })
  }
}
</script>

<template>
  <div
    data-slot="dialog-overlay"
    :data-state="snapshot.open ? 'open' : 'closed'"
    :data-phase="snapshot.phase"
    :class="overlayClass"
    @click="onClick"
  />
</template>
