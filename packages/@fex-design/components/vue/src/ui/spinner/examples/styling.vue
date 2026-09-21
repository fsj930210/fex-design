<script setup lang="ts">
import { SpinnerContainer } from '@fex-design/vue/ui/spinner'
</script>
<template>
  <SpinnerContainer
    :spinning="true"
    text="蓝色文本"
    class="min-h-32 rounded-md border border-border"
    :class-names="{
      overlay: 'bg-amber-100/95',
      spinner: 'text-fuchsia-600',
      text: 'font-bold text-blue-600',
    }"
    :styles="{ overlay: { outline: '3px dashed #f97316' } }"
    ><div class="p-6 text-slate-500">灰色内容区域</div></SpinnerContainer
  >
</template>
