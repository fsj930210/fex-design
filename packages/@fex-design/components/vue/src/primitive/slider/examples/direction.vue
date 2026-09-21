<script setup lang="ts">
import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/vue/primitive/slider'
</script>
<template>
  <div class="grid w-full max-w-xl gap-6">
    <section dir="ltr">
      <p>中文 LTR</p>
      <SliderRoot :default-value="[30]"
        ><SliderTrack><SliderRange /></SliderTrack><SliderThumb :index="0" aria-label="滑块 1"
      /></SliderRoot>
    </section>
    <section dir="rtl">
      <p>العربية RTL</p>
      <SliderRoot :default-value="[30]" direction="rtl"
        ><SliderTrack><SliderRange /></SliderTrack><SliderThumb :index="0" aria-label="滑块 1"
      /></SliderRoot>
    </section>
    <section>
      <p>Reverse</p>
      <SliderRoot :default-value="[30]" reverse
        ><SliderTrack><SliderRange /></SliderTrack><SliderThumb :index="0" aria-label="滑块 1"
      /></SliderRoot>
    </section>
    <div class="flex h-48 gap-12">
      <section class="grid gap-2">
        <p>垂直</p>
        <SliderRoot orientation="vertical" :default-value="[35]"
          ><SliderTrack><SliderRange /></SliderTrack><SliderThumb :index="0" aria-label="滑块 1"
        /></SliderRoot>
      </section>
      <section class="grid gap-2">
        <p>垂直 Reverse</p>
        <SliderRoot orientation="vertical" reverse :default-value="[35]"
          ><SliderTrack><SliderRange /></SliderTrack><SliderThumb :index="0" aria-label="滑块 1"
        /></SliderRoot>
      </section>
    </div>
  </div>
</template>
