<script setup lang="ts">
import { dialogIconCloseClassName } from '@fex-design/components-styles/dialog'
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
import { MinusIcon } from '@fex-design/vue/icons/minus'
import { SquareIcon } from '@fex-design/vue/icons/square'
const open = ref(false)
const rect = ref({ x: 0, y: 0, width: 480, height: 300 })
const mode = ref<'normal' | 'minimized' | 'maximized'>('normal')
const bar = ref({ x: 16, y: 16 })
function minimize() {
  bar.value = { x: 16, y: Math.max(0, window.innerHeight - 56) }
  mode.value = 'minimized'
}
const interaction = useMove({
  get position() {
    return mode.value === 'minimized' ? bar.value : { x: rect.value.x, y: rect.value.y }
  },
  bounds: 'viewport',
  onMove: (point) => {
    if (mode.value === 'minimized') {
      bar.value = point
      return
    }
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
  const height = Math.min(300, window.innerHeight - 56)
  rect.value = {
    x: (window.innerWidth - width) / 2,
    y: (window.innerHeight - height) / 2,
    width,
    height,
  }
  mode.value = 'normal'
  open.value = true
}
const style = computed<CSSProperties>(() => ({
  left:
    mode.value === 'maximized'
      ? '0px'
      : mode.value === 'minimized'
        ? bar.value.x + 'px'
        : rect.value.x + 'px',
  top:
    mode.value === 'maximized'
      ? '0px'
      : mode.value === 'minimized'
        ? bar.value.y + 'px'
        : rect.value.y + 'px',
  width:
    mode.value === 'maximized'
      ? window.innerWidth + 'px'
      : mode.value === 'minimized'
        ? '280px'
        : rect.value.width + 'px',
  height:
    mode.value === 'maximized'
      ? window.innerHeight + 'px'
      : mode.value === 'minimized'
        ? '40px'
        : rect.value.height + 'px',
  overflow: mode.value === 'minimized' ? 'visible' : 'hidden',
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
  <Button @click="show">打开最小化与最大化</Button>
  <DialogRoot v-model:open="open" :modal="false"
    ><DialogPortal
      ><DialogContent
        :class="
          'group/minimax ' +
          (mode === 'minimized'
            ? '[&_[data-slot=dialog-header]]:text-sm [&_[data-slot=dialog-title]]:text-sm [&_[data-slot=dialog-header]]:px-3 [&_[data-slot=dialog-header]]:py-[7px] [&_[data-slot=dialog-header]]:border-b-0 [&_[data-slot=dialog-header]]:rounded-[inherit] [&_[data-slot=dialog-actions]]:top-2 [&_[data-slot=dialog-actions]]:end-2'
            : '')
        "
        :style="style"
        ><DialogHeader
          ><DialogTitle
            ><div
              :ref="bindHeader"
              @pointerdown="mode !== 'maximized' && interaction.onPointerDown($event)"
              @dblclick="mode = 'normal'"
              class="cursor-move touch-none select-none pe-20 font-semibold leading-6"
            >
              最小化与最大化<button
                v-if="mode === 'minimized'"
                type="button"
                aria-label="预览窗口，点击恢复"
                class="absolute bottom-full start-0 z-20 hidden pb-2 group-hover/minimax:block"
                @pointerdown.stop
                @click="mode = 'normal'"
              >
                <span
                  class="block w-60 overflow-hidden rounded-md border border-border bg-background text-left text-foreground shadow-xl"
                  ><span class="block h-[150px] w-[480px] origin-top-left scale-50"
                    ><span class="block border-b border-border p-4 font-semibold"
                      >最小化与最大化</span
                    ><span class="block h-[180px] p-4 text-sm leading-6"
                      >最小化后工具条仍可拖动，双击工具条或点击恢复按钮还原窗口，保留原位置和尺寸。</span
                    ><span class="block border-t border-border p-4 text-right"
                      ><span class="inline-block rounded-md border border-border px-3 py-1 text-sm"
                        >关闭窗口</span
                      ></span
                    ></span
                  ></span
                >
              </button>
            </div></DialogTitle
          ></DialogHeader
        ><DialogActions
          ><Button
            v-if="mode !== 'minimized'"
            variant="text"
            :class="dialogIconCloseClassName"
            aria-label="最小化"
            @click="minimize"
            ><MinusIcon class="size-4" /></Button
          ><Button
            variant="text"
            :class="dialogIconCloseClassName"
            :aria-label="mode === 'normal' ? '最大化' : '恢复'"
            @click="mode = mode === 'normal' ? 'maximized' : 'normal'"
            ><SquareIcon class="size-4" /></Button
          ><DialogClose /></DialogActions
        ><DialogBody :class="mode === 'minimized' ? 'hidden' : 'flex-1 min-h-0'"
          ><p>
            最小化后工具条仍可拖动，双击工具条或点击恢复按钮还原窗口，保留原位置和尺寸。
          </p></DialogBody
        ><DialogFooter :class="mode === 'minimized' ? 'hidden' : ''"
          ><Button @click="open = false">关闭窗口</Button></DialogFooter
        ></DialogContent
      ></DialogPortal
    ></DialogRoot
  >
</template>
