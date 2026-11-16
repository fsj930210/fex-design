<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@fex-design/vue/primitive/button'
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogClose } from '@fex-design/vue/primitive/dialog'
const open = ref(false); const minimized = ref(false); const maximized = ref(false); const position = ref({x:0,y:0}); const dragging=ref(false); const start=ref({x:0,y:0})
function dragStart(e:PointerEvent){dragging.value=true;start.value={x:e.clientX-position.value.x,y:e.clientY-position.value.y};window.addEventListener('pointermove',dragMove);window.addEventListener('pointerup',dragEnd,{once:true})}
function dragMove(e:PointerEvent){if(dragging.value)position.value={x:e.clientX-start.value.x,y:e.clientY-start.value.y}}
function dragEnd(){dragging.value=false;window.removeEventListener('pointermove',dragMove)}
const style=computed(()=>({transform:`translate(calc(-50% + ${position.value.x}px),calc(-50% + ${position.value.y}px))`,display:minimized.value?'none':undefined}))
</script>
<template><Button @click="open=true">打开高级 Dialog</Button><DialogRoot :open="open" @open-change="open=$event"><DialogPortal><DialogOverlay/><DialogContent :style="style" :class="maximized?'max-w-none w-screen h-screen':'max-w-none w-[520px] min-w-80 max-w-[860px] min-h-55 max-h-[620px] resize'"><DialogHeader><div class="cursor-move select-none" @pointerdown="dragStart"><DialogTitle>Draggable / Minmax / Resize</DialogTitle></div><Button @click="minimized=!minimized">{{minimized?'恢复':'最小化'}}</Button><Button @click="maximized=!maximized">{{maximized?'还原':'最大化'}}</Button><DialogClose/></DialogHeader><DialogBody>拖动 Header 移动窗口，使用边缘调整尺寸，最小/最大状态共享同一个 Dialog。</DialogBody></DialogContent></DialogPortal></DialogRoot></template>

