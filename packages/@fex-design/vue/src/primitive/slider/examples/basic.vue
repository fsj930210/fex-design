<script setup lang="ts">
import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/vue/primitive/slider'
import { computed, ref } from 'vue'
const value = ref(42)
const ended = ref(42)
</script>
<template>
  <div class="grid w-full max-w-xl gap-4">
    <SliderRoot
      :value="[value]"
      @change="(values) => (value = values[0])"
      @end="(values) => (ended = values[0])"
      ><SliderTrack><SliderRange /></SliderTrack><SliderThumb :index="0" aria-label="滑块 1"
    /></SliderRoot>
    <p>当前值：{{ value }}；结束值：{{ ended }}</p>
    <SliderRoot :default-value="[60]" :keyboard="false"
      ><SliderTrack><SliderRange /></SliderTrack><SliderThumb :index="0" aria-label="滑块 1"
    /></SliderRoot>
  </div>
</template>
