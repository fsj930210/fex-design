<script setup lang="ts">
import { Slider } from '@fex-design/vue/ui/slider'
import { Checkbox } from '@fex-design/vue/ui/checkbox'
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
      <Slider :default-value="40" disabled />
    </section>
    <section class="grid gap-4">
      <h4>禁用指定 Thumb</h4>
      <div class="flex flex-wrap gap-4">
        <Checkbox
          v-for="(checked, index) in disabledThumbs"
          :key="index"
          :checked="checked"
          @change="toggle(index)"
          >Thumb {{ index + 1 }}</Checkbox
        >
      </div>
      <Slider :default-value="[20, 50, 80]" :disabled="disabledThumbs" />
    </section>
  </div>
</template>
