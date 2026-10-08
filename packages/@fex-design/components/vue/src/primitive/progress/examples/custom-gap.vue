<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@fex-design/vue/ui/slider'
import StepRingDemo from './_parts/step-ring.vue'

defineOptions({ name: 'ProgressPrimitiveCustomGapExample' })
const gap = ref(2)
function changeGap(next: number | number[]) { gap.value = typeof next === 'number' ? next : next[0] ?? 2 }
</script>

<template>
  <div class="grid w-full max-w-md gap-4">
    <label class="grid gap-2 text-sm">
      <span class="font-medium">
        分段间隔：{{ gap }}px
      </span>
      <Slider :value="gap" :min="0" :max="8" :step="1" @change="changeGap" />
    </label>
    <div class="flex items-center gap-6">
      <StepRingDemo :value="50" :gap="gap" :steps="8" color="var(--info)" />
      <StepRingDemo :value="100" :gap="gap" :steps="8" color="var(--success)" />
    </div>
  </div>
</template>
