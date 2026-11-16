<script setup lang="ts">
import { computed, ref } from 'vue'
import { Dialog } from '@fex-design/vue/ui/dialog'
import { Button } from '@fex-design/vue/ui/button'
const open = ref(false)
const minimized = ref(false)
const maximized = ref(false)
const position = ref({ x: 0, y: 0 })
const dragging = ref(false)
const start = ref({ x: 0, y: 0 })
function dragStart(event: PointerEvent) { dragging.value = true; start.value = { x: event.clientX - position.value.x, y: event.clientY - position.value.y }; window.addEventListener('pointermove', dragMove); window.addEventListener('pointerup', dragEnd, { once: true }) }
function dragMove(event: PointerEvent) { if (dragging.value) position.value = { x: event.clientX - start.value.x, y: event.clientY - start.value.y } }
function dragEnd() { dragging.value = false; window.removeEventListener('pointermove', dragMove) }
const contentStyle = computed(() => ({ transform: `translate(calc(-50% + ${position.value.x}px), calc(-50% + ${position.value.y}px))` }))
</script>
<template><Button @click="open = true">打开 Dialog</Button><Dialog :open="open" @open-change="open = $event" title="高级交互" :styles="{ content: contentStyle }" :class-names="{ content: maximized ? 'resize min-w-80 max-w-none min-h-55 max-h-none w-screen h-screen' : 'resize min-w-80 max-w-[860px] min-h-55 max-h-[620px]' }"><div class="cursor-move select-none" @pointerdown="dragStart">拖动这里移动 Dialog</div><div class="flex gap-2"><Button @click="minimized = !minimized">{{ minimized ? '恢复' : '最小化' }}</Button><Button @click="maximized = !maximized">{{ maximized ? '还原' : '最大化' }}</Button></div><p v-if="!minimized">调整右下角尺寸，并使用最小化/最大化控制。</p></Dialog></template>
