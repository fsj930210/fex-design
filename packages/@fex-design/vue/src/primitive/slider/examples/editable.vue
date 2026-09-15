<script setup lang="ts">
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/vue/primitive/slider'
import { ref } from 'vue'
const values = ref([20, 50, 80])
</script>
<template>
  <div class="grid w-full max-w-xl gap-3">
    <SliderRoot
      :value="values"
      editable
      :min-count="2"
      :max-count="5"
      @change="(next) => (values = next)"
      ><SliderTrack><SliderRange /></SliderTrack
      ><SliderThumb
        v-for="(_, index) in values"
        :key="index"
        :index="index"
        :aria-label="`滑块 ${index + 1}`"
    /></SliderRoot>
    <p>当前节点：{{ values.join('、') }}</p>
  </div>
</template>
