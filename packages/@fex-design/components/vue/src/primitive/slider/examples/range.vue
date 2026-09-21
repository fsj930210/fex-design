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
    <SliderRoot :default-value="[20, 80]" :step="5" :min-steps-between-thumbs="2"
      ><SliderTrack><SliderRange /></SliderTrack
      ><SliderThumb :index="0" aria-label="滑块 1" /><SliderThumb
        :index="1"
        aria-label="滑块 2" /></SliderRoot
    ><SliderRoot :default-value="[15, 40, 70]"
      ><SliderTrack><SliderRange /></SliderTrack
      ><SliderThumb :index="0" aria-label="滑块 1" /><SliderThumb
        :index="1"
        aria-label="滑块 2" /><SliderThumb :index="2" aria-label="滑块 3"
    /></SliderRoot>
  </div>
</template>
