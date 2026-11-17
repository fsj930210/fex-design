<script setup lang="ts">
import { dialogContentClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
import type { ComponentPublicInstance } from 'vue'
import { computed, onBeforeUnmount } from 'vue'
import { useDialogContext } from './context'

defineOptions({ inheritAttrs: false })

const props = defineProps<{ class?: string }>()
const { contentId, dialog, fullscreen, fullscreenActive, modal, snapshot, titleId } =
  useDialogContext('DialogContent')
const contentClass = computed(() => cn(dialogContentClassName, props.class))

function setContent(element: Element | ComponentPublicInstance | null) {
  dialog.setLayerElement(element instanceof HTMLDivElement ? element : null)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    dialog.close({ reason: 'escape-key', event })
  }
}

onBeforeUnmount(() => {
  dialog.setLayerElement(null)
})
</script>

<template>
  <div
    v-if="snapshot.mounted"
    :ref="setContent"
    :id="contentId"
    role="dialog"
    :aria-modal="modal ? 'true' : undefined"
    :aria-labelledby="titleId"
    tabindex="-1"
    data-slot="dialog-content"
    :data-state="snapshot.open ? 'open' : 'closed'"
    :data-phase="snapshot.phase"
    :style="[
      $attrs.style,
      fullscreenActive && fullscreen
        ? {
            width:
              typeof fullscreen === 'object' && fullscreen.width !== undefined
                ? typeof fullscreen.width === 'number'
                  ? `${fullscreen.width}px`
                  : fullscreen.width
                : '100vw',
            height:
              typeof fullscreen === 'object' && fullscreen.height !== undefined
                ? typeof fullscreen.height === 'number'
                  ? `${fullscreen.height}px`
                  : fullscreen.height
                : '100vh',
          }
        : undefined,
    ]"
    :class="[contentClass, fullscreenActive && 'rounded-none']"
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>
