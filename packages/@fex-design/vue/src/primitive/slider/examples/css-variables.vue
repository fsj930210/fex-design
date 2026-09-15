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
  <SliderRoot
    :default-value="[45]"
    class="[--slider-track-height:10px] [--slider-track-background:#fed7aa] [--slider-range-background:#2563eb] [--slider-thumb-size:24px] [--slider-thumb-background:white] [--slider-thumb-border-color:#1d4ed8]"
    ><SliderTrack><SliderRange /></SliderTrack><SliderThumb :index="0" aria-label="滑块 1"
  /></SliderRoot>
</template>
