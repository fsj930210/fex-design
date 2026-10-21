<script setup lang="ts">
import {
  SpinnerContainer,
  SpinnerOverlay,
  Spinner,
  SpinnerText,
} from '@fex-design/vue/primitive/spinner'
defineOptions({ name: 'SpinnerSemanticStylesExample' })
</script>
<template>
  <SpinnerContainer class="min-h-32 rounded-md border border-border" aria-busy="true"
    ><div class="p-6 text-slate-500">灰色内容区域</div>
    <SpinnerOverlay class="bg-amber-100/95" :style="{ outline: '3px dashed #f97316' }"
      ><Spinner class="text-fuchsia-600"></Spinner
      ><SpinnerText class="font-bold text-blue-600">蓝色文本</SpinnerText></SpinnerOverlay
    ></SpinnerContainer
  >
</template>
