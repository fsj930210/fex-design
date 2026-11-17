<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@fex-design/vue/primitive/button'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogActions,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogFullscreenToggle,
} from '@fex-design/vue/primitive/dialog'
const modal = ref(true)
const open = ref(false)
const closable = ref(false)
const overlay = ref(true)
</script>
<template>
  <Button @click="modal = !modal">模态：{{ modal ? '是' : '否' }}</Button
  ><Button @click="overlay = !overlay">Overlay：{{ overlay ? '有' : '无' }}</Button
  ><Button @click="closable = !closable">Overlay 点击关闭：{{ closable ? '开' : '关' }}</Button
  ><Button @click="open = true">打开 Dialog</Button><span>状态：{{ open ? '打开' : '关闭' }}</span
  ><DialogRoot
    :modal="modal"
    :open="open"
    :close-on-overlay-click="closable"
    @open-change="open = $event"
    ><DialogPortal
      ><DialogOverlay v-if="overlay" /><DialogContent
        ><DialogHeader><DialogTitle>Overlay</DialogTitle></DialogHeader
        ><DialogActions><DialogClose /></DialogActions
        ><DialogBody>测试 Overlay 显示和关闭行为。</DialogBody
        ><DialogFooter
          ><DialogClose>取消</DialogClose
          ><Button variant="solid" color="primary">确定</Button></DialogFooter
        ></DialogContent
      ></DialogPortal
    ></DialogRoot
  >
</template>
