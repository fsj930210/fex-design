<script setup lang="ts">
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner } from '@fex-design/vue/primitive/scrollbar'
</script>
<template>
  <div class="flex w-full flex-wrap gap-6">
  <section class="grid gap-3"><h4 class="text-sm font-medium">默认：透明轨道，滑块仍可见</h4>
    <ScrollbarRoot class="h-48 w-72 rounded-md border" :auto-hide="'never'" :overflow="{'x':'auto','y':'auto'}"><ScrollbarViewport><div class="grid w-[40rem] gap-3 p-4"><p v-for="line in scrollbarDemoLines" :key="line">{{ line }}</p></div></ScrollbarViewport>
      <ScrollbarBar :axis="'x'"><ScrollbarTrack :axis="'x'"><ScrollbarThumb :axis="'x'"></ScrollbarThumb></ScrollbarTrack></ScrollbarBar>
      <ScrollbarBar :axis="'y'"><ScrollbarTrack :axis="'y'"><ScrollbarThumb :axis="'y'"></ScrollbarThumb></ScrollbarTrack></ScrollbarBar>
      <ScrollbarCorner></ScrollbarCorner></ScrollbarRoot>
  </section>
  <section class="grid gap-3"><h4 class="text-sm font-medium">showTrack：显示轨道与交角背景</h4>
    <ScrollbarRoot show-track class="h-48 w-72 rounded-md border" :auto-hide="'never'" :overflow="{'x':'auto','y':'auto'}"><ScrollbarViewport><div class="grid w-[40rem] gap-3 p-4"><p v-for="line in scrollbarDemoLines" :key="line">{{ line }}</p></div></ScrollbarViewport>
      <ScrollbarBar :axis="'x'"><ScrollbarTrack :axis="'x'"><ScrollbarThumb :axis="'x'"></ScrollbarThumb></ScrollbarTrack></ScrollbarBar>
      <ScrollbarBar :axis="'y'"><ScrollbarTrack :axis="'y'"><ScrollbarThumb :axis="'y'"></ScrollbarThumb></ScrollbarTrack></ScrollbarBar>
      <ScrollbarCorner></ScrollbarCorner></ScrollbarRoot>
  </section>
  <section class="grid gap-3"><h4 class="text-sm font-medium">showTrack + showCorner=false：仅显示轨道</h4>
    <ScrollbarRoot show-track :show-corner="false" class="h-48 w-72 rounded-md border" :auto-hide="'never'" :overflow="{'x':'auto','y':'auto'}"><ScrollbarViewport><div class="grid w-[40rem] gap-3 p-4"><p v-for="line in scrollbarDemoLines" :key="line">{{ line }}</p></div></ScrollbarViewport>
      <ScrollbarBar :axis="'x'"><ScrollbarTrack :axis="'x'"><ScrollbarThumb :axis="'x'"></ScrollbarThumb></ScrollbarTrack></ScrollbarBar>
      <ScrollbarBar :axis="'y'"><ScrollbarTrack :axis="'y'"><ScrollbarThumb :axis="'y'"></ScrollbarThumb></ScrollbarTrack></ScrollbarBar>
      <ScrollbarCorner></ScrollbarCorner></ScrollbarRoot>
  </section>
  <section class="grid gap-3"><h4 class="text-sm font-medium">showTrack=false + showCorner：仅显示交角</h4>
    <ScrollbarRoot show-corner class="h-48 w-72 rounded-md border" :auto-hide="'never'" :overflow="{'x':'auto','y':'auto'}"><ScrollbarViewport><div class="grid w-[40rem] gap-3 p-4"><p v-for="line in scrollbarDemoLines" :key="line">{{ line }}</p></div></ScrollbarViewport>
      <ScrollbarBar :axis="'x'"><ScrollbarTrack :axis="'x'"><ScrollbarThumb :axis="'x'"></ScrollbarThumb></ScrollbarTrack></ScrollbarBar>
      <ScrollbarBar :axis="'y'"><ScrollbarTrack :axis="'y'"><ScrollbarThumb :axis="'y'"></ScrollbarThumb></ScrollbarTrack></ScrollbarBar>
      <ScrollbarCorner></ScrollbarCorner></ScrollbarRoot>
  </section>
  </div>
</template>
