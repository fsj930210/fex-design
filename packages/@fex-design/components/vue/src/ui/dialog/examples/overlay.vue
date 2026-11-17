<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from '@fex-design/vue/ui/dialog'
import { Button } from '@fex-design/vue/ui/button'
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
  ><Dialog
    :modal="modal"
    v-model:open="open"
    :overlay="overlay"
    :close-on-overlay-click="closable"
    title="Overlay"
    >测试 Overlay 显示和关闭行为。</Dialog
  >
</template>
