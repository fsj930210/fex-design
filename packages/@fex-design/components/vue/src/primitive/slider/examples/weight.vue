<script setup lang="ts">
import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/vue/primitive/slider'
import { computed, ref } from 'vue'
const value = ref(40)
const right = computed(() => 100 - value.value)
</script>
<template>
  <div class="grid w-full max-w-xl gap-3">
    <div class="flex justify-between">
      <span>模型准确率 {{ value }}%</span><span>响应速度 {{ right }}%</span>
    </div>
    <SliderRoot :value="[value]" @change="(values) => (value = values[0])"
      ><SliderTrack class="bg-orange-500"><SliderRange class="bg-blue-500" /></SliderTrack
      ><SliderThumb
        aria-label="模型权重分配"
        :aria-valuetext="`模型准确率 ${value}%，响应速度 ${right}%`"
    /></SliderRoot>
  </div>
</template>
