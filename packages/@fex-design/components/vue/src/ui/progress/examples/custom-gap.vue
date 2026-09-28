<script setup lang="ts">
import { ref } from "vue"
import { Slider } from "@fex-design/vue/ui/slider"
import { Progress } from "@fex-design/vue/ui/progress"
const gap = ref(2)
</script>
<template>
  <div class="grid w-full max-w-md gap-4">
    <label class="grid gap-2 text-sm"><span class="font-medium">分段间隔：{{ gap }}px</span><Slider v-model="gap" :min="0" :max="8" :step="1" /></label>
    <div class="flex items-center gap-6">
      <Progress variant="circle" :value="50" :size="96" :steps="8" :gap="gap" color="var(--info)" linecap="butt" track-linecap="butt" show-info />
      <Progress variant="circle" :value="100" :size="96" :steps="8" :gap="gap" color="var(--success)" linecap="butt" track-linecap="butt" success show-info />
    </div>
  </div>
</template>
