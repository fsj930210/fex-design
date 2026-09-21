<script setup lang="ts">
import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/vue/primitive/slider'
import { CheckboxRoot, CheckboxControl, CheckboxLabel } from '@fex-design/vue/primitive/checkbox'
import { ref } from 'vue'
const disabledThumbs = ref([true, true, true])
const toggle = (index: number) => {
  disabledThumbs.value[index] = !disabledThumbs.value[index]
}
</script>
<template>
  <div class="grid w-full max-w-2xl gap-10">
    <section class="grid gap-4">
      <h4>整体禁用</h4>
      <SliderRoot :default-value="[40]" disabled
        ><SliderTrack><SliderRange /></SliderTrack><SliderThumb :index="0" aria-label="滑块 1"
      /></SliderRoot>
    </section>
    <section class="grid gap-4">
      <h4>禁用指定 Thumb</h4>
      <div class="flex flex-wrap gap-4">
        <CheckboxRoot v-for="(checked, index) in disabledThumbs" :key="index" :checked="checked" @change="toggle(index)" class="inline-flex items-center gap-2"><CheckboxControl /><CheckboxLabel>Thumb {{ index + 1 }}</CheckboxLabel></CheckboxRoot>
      </div>
      <SliderRoot :default-value="[20, 50, 80]" :disabled-thumbs="disabledThumbs"
        ><SliderTrack><SliderRange /></SliderTrack
        ><SliderThumb
          v-for="(disabled, index) in disabledThumbs"
          :key="index"
          :index="index"
          :disabled="disabled"
      /></SliderRoot>
    </section>
  </div>
</template>

