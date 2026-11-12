<script setup lang="ts">
const props = defineProps<{ invalid?: boolean }>()
import { Slider } from '@fex-design/vue/ui/slider'
import { computed, ref } from 'vue'
const value = ref(42)
const ended = ref(42)
</script>
<template>
  <div class="grid w-full max-w-xl gap-4">
    <Slider
      :aria-invalid="props.invalid || undefined"
      :value="value"
      @change="(next) => (value = next)"
      @end="(next) => (ended = next)"
    />
    <p>当前值：{{ value }}；结束值：{{ ended }}</p>
    <Slider :aria-invalid="props.invalid || undefined" :default-value="60" :keyboard="false" />
  </div>
</template>
