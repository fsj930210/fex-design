<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import { useMove } from '@fex-design/vue/composables/use-move'
import { Button } from '@fex-design/vue/primitive/button'
import {
  DialogRoot,
  DialogPortal,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogActions,
  DialogClose,
  DialogBody,
  DialogFooter,
} from '@fex-design/vue/primitive/dialog'
const open = ref(false)
const rect = ref({ x: 0, y: 0, width: 480, height: 300 })
const interaction = useMove({
  get position() {
    return { x: rect.value.x, y: rect.value.y }
  },
  bounds: 'viewport',
  onMove: (point) => {
    rect.value = { ...rect.value, ...point }
  },
})
function bindHeader(element: unknown) {
  if (!(element instanceof HTMLElement)) return
  // Slot refs run before their DialogContent ancestor is inserted.
  void nextTick(() => {
    if (!element.isConnected) return
    interaction.setTarget(element.closest<HTMLElement>('[data-slot="dialog-content"]'))
    interaction.setHandle(element)
  })
}
function show() {
  const width = Math.min(480, window.innerWidth - 32)
  const height = Math.min(300, window.innerHeight - 64)
  rect.value = {
    x: (window.innerWidth - width) / 2,
    y: (window.innerHeight - height) / 2,
    width,
    height,
  }
  open.value = true
}
const style = computed<CSSProperties>(() => ({
  left: rect.value.x + 'px',
  top: rect.value.y + 'px',
  width: rect.value.width + 'px',
  height: rect.value.height + 'px',
  translate: 'none',
  transform: 'none',
  transitionProperty: 'opacity, scale',
  maxWidth: 'none',
  maxHeight: 'none',
  display: 'flex',
  flexDirection: 'column',
}))
</script>
<template>
  <Button @click="show">打开拖拽弹窗</Button>
  <DialogRoot v-model:open="open" :modal="false"
    ><DialogPortal
      ><DialogContent :style="style"
        ><DialogHeader
          ><DialogTitle
            ><div
              :ref="bindHeader"
              @pointerdown="interaction.onPointerDown($event)"
              class="cursor-move touch-none select-none pe-20 font-semibold leading-6"
            >
              拖拽弹窗
            </div></DialogTitle
          ></DialogHeader
        ><DialogActions><DialogClose /></DialogActions
        ><DialogBody :class="'flex-1 min-h-0'"
          ><p>按住标题区拖动窗口，窗口保持在展示区域内。</p></DialogBody
        ><DialogFooter :class="''"
          ><Button @click="open = false">关闭窗口</Button></DialogFooter
        ></DialogContent
      ></DialogPortal
    ></DialogRoot
  >
</template>
