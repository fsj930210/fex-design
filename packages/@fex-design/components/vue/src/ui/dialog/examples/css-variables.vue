<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from '@fex-design/vue/ui/dialog'
import { Button } from '@fex-design/vue/ui/button'
const open = ref(false)
</script>
<template>
  <Button @click="open = true">打开 Dialog</Button
  ><Dialog
    v-model:open="open"
    title="CSS Variables"
    :class-names="{
      content:
        '[--dialog-header-background:var(--color-blue-100)] [--dialog-content-background:var(--color-blue-50)] [--dialog-footer-background:var(--color-indigo-100)]',
    }"
    ><p>通过 CSS 变量分别设置标题区、正文和页脚的背景色。</p></Dialog
  >
</template>
