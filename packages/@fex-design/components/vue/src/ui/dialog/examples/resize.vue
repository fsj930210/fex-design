<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import { useResize } from '@fex-design/vue/composables/use-resize'
import { Button } from '@fex-design/vue/ui/button'
import { Dialog } from '@fex-design/vue/ui/dialog'
const open = ref(false)
const rect = ref({ x: 0, y: 0, width: 480, height: 300 })
const interaction = useResize({
  get rect() {
    return rect.value
  },
  bounds: 'viewport',
  minWidth: 280,
  minHeight: 200,
  onResize: (next) => {
    rect.value = next
  },
})
function bindHeader(element: unknown) {
  if (!(element instanceof HTMLElement)) return
  // Slot refs run before their DialogContent ancestor is inserted.
  void nextTick(() => {
    if (!element.isConnected) return
    interaction.setTarget(element.closest<HTMLElement>('[data-slot="dialog-content"]'))
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
  <Button @click="show">打开调整弹窗尺寸</Button>
  <Dialog
    v-model:open="open"
    :modal="false"
    :overlay="false"
    :styles="{ content: style }"
    :class-names="{ title: 'hidden', body: 'flex-1 min-h-0', footer: '' }"
    ><template #header
      ><div :ref="bindHeader" class="pe-20 font-semibold leading-6">调整弹窗尺寸</div></template
    >
    <p>拖动四条边或四个角调整尺寸，最小宽度 280px、高度 200px。</p>
    <div
      v-bind="interaction.getHandleProps('top')"
      class="absolute z-10 left-2 right-2 top-0 h-2 cursor-ns-resize"
      aria-label="top 缩放"
    />
    <div
      v-bind="interaction.getHandleProps('right')"
      class="absolute z-10 right-0 top-2 bottom-2 w-2 cursor-ew-resize"
      aria-label="right 缩放"
    />
    <div
      v-bind="interaction.getHandleProps('bottom')"
      class="absolute z-10 left-2 right-2 bottom-0 h-2 cursor-ns-resize"
      aria-label="bottom 缩放"
    />
    <div
      v-bind="interaction.getHandleProps('left')"
      class="absolute z-10 left-0 top-2 bottom-2 w-2 cursor-ew-resize"
      aria-label="left 缩放"
    />
    <div
      v-bind="interaction.getHandleProps('top-left')"
      class="absolute z-10 left-0 top-0 size-3 cursor-nwse-resize"
      aria-label="top-left 缩放"
    />
    <div
      v-bind="interaction.getHandleProps('top-right')"
      class="absolute z-10 right-0 top-0 size-3 cursor-nesw-resize"
      aria-label="top-right 缩放"
    />
    <div
      v-bind="interaction.getHandleProps('bottom-left')"
      class="absolute z-10 left-0 bottom-0 size-3 cursor-nesw-resize"
      aria-label="bottom-left 缩放"
    />
    <div
      v-bind="interaction.getHandleProps('bottom-right')"
      class="absolute z-10 right-0 bottom-0 size-3 cursor-nwse-resize"
      aria-label="bottom-right 缩放"
    />
    <template #footer><Button @click="open = false">关闭窗口</Button></template></Dialog
  >
</template>
