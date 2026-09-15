<script setup lang="ts">
import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/vue/primitive/slider'
import { computed, ref } from 'vue'
const recommended = ref(37)
const marks = computed(() => [
  { value: 0, label: '0°C' },
  { value: 26, label: '26°C' },
  { value: recommended.value, label: `建议 ${recommended.value}°C` },
  { value: 100, label: '100°C' },
])
</script>
<template>
  <div class="grid w-full max-w-2xl gap-8 pb-6">
    <button @click="recommended = recommended === 37 ? 60 : 37">将建议刻度移到 {{ recommended === 37 ? 60 : 37 }}°C</button>
    <section v-for="scene in [{ title: 'included=true（单值与范围）', values: [[37], [26, 37]] }, { title: 'included=false（刻度彼此独立）', values: [[37]], included: false }, { title: 'marks & step（步长与刻度并存）', values: [[37]], step: 10, dots: true }, { title: 'step=null（只能落在标记点）', values: [[37]], step: null }]" :key="scene.title" class="grid gap-4">
      <h4>{{ scene.title }}</h4>
      <SliderRoot v-for="values in scene.values" :key="values.join('-')" :default-value="values" :marks="marks.map((mark) => mark.value)" :step="scene.step"><SliderTrack><SliderRange v-if="scene.included !== false" /><SliderMark v-for="dot in scene.dots ? 11 : 0" :key="`dot-${dot}`" :value="(dot - 1) * 10" aria-hidden="true" /><SliderMark v-for="mark in marks" :key="mark.value" :value="mark.value">{{ mark.label }}</SliderMark></SliderTrack><SliderThumb v-for="(_, index) in values" :key="index" :index="index" /></SliderRoot>
    </section>
  </div>
</template>
