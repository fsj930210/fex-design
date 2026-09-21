<script setup lang="ts">
import { Slider } from '@fex-design/vue/ui/slider'
import { computed, ref } from 'vue'
const value = ref(40)
const right = computed(() => 100 - value.value)
</script>
<template>
  <div class="grid w-full max-w-xl gap-3">
    <div class="flex justify-between">
      <span>模型准确率 {{ value }}%</span><span>响应速度 {{ right }}%</span>
    </div>
    <Slider
      :value="value"
      :class-names="{ track: 'bg-orange-500', range: 'bg-blue-500' }"
      @change="(next) => (value = next)"
    />
  </div>
</template>
