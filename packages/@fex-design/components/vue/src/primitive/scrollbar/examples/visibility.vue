<script setup lang="ts">
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '@fex-design/vue/primitive/scrollbar'
</script>
<template>
  <div class="flex w-full flex-wrap gap-6">
    <section class="grid gap-3">
      <h4 class="text-sm font-medium">auto：内容溢出时显示</h4>
      <ScrollbarRoot
        class="h-48 w-72 rounded-md border"
        :auto-hide="'never'"
        :overflow="{ x: 'hidden', y: 'auto' }"
        :visibility="'auto'"
        ><ScrollbarViewport
          ><div class="grid gap-3 p-4">
            <p v-for="line in scrollbarDemoLines" :key="line">{{ line }}</p>
          </div></ScrollbarViewport
        >
        <ScrollbarBar :axis="'y'"
          ><ScrollbarTrack :axis="'y'"
            ><ScrollbarThumb :axis="'y'"></ScrollbarThumb></ScrollbarTrack></ScrollbarBar
      ></ScrollbarRoot>
    </section>
    <section class="grid gap-3">
      <h4 class="text-sm font-medium">always：内容不足时也显示</h4>
      <ScrollbarRoot
        class="h-48 w-72 rounded-md border"
        :auto-hide="'never'"
        :overflow="{ x: 'hidden', y: 'auto' }"
        :visibility="'always'"
        ><ScrollbarViewport><p class="p-4">内容不足一屏</p></ScrollbarViewport>
        <ScrollbarBar :axis="'y'"
          ><ScrollbarTrack :axis="'y'"
            ><ScrollbarThumb :axis="'y'"></ScrollbarThumb></ScrollbarTrack></ScrollbarBar
      ></ScrollbarRoot>
    </section>
    <section class="grid gap-3">
      <h4 class="text-sm font-medium">hidden：隐藏滚动条，保留原生滚动</h4>
      <ScrollbarRoot
        class="h-48 w-72 rounded-md border"
        :auto-hide="'never'"
        :overflow="{ x: 'hidden', y: 'auto' }"
        :visibility="'hidden'"
        ><ScrollbarViewport
          ><div class="grid gap-3 p-4">
            <p v-for="line in scrollbarDemoLines" :key="line">{{ line }}</p>
          </div></ScrollbarViewport
        >
        <ScrollbarBar :axis="'y'"
          ><ScrollbarTrack :axis="'y'"
            ><ScrollbarThumb :axis="'y'"></ScrollbarThumb></ScrollbarTrack></ScrollbarBar
      ></ScrollbarRoot>
    </section>
  </div>
</template>
