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
    <SliderRoot size="sm" :default-value="[25]"
      ><SliderTrack><SliderRange /></SliderTrack
      ><SliderThumb :index="0" aria-label="滑块 1" /></SliderRoot
    ><SliderRoot size="md" :default-value="[50]"
      ><SliderTrack><SliderRange /></SliderTrack
      ><SliderThumb :index="0" aria-label="滑块 1" /></SliderRoot
    ><SliderRoot size="lg" :default-value="[75]"
      ><SliderTrack><SliderRange /></SliderTrack><SliderThumb :index="0" aria-label="滑块 1"
    /></SliderRoot>
  </div>
</template>
