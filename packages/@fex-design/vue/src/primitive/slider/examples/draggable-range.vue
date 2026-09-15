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
  <SliderRoot :default-value="[20, 50]" draggable-range
    ><SliderTrack><SliderRange /></SliderTrack
    ><SliderThumb :index="0" aria-label="滑块 1" /><SliderThumb :index="1" aria-label="滑块 2"
  /></SliderRoot>
</template>
