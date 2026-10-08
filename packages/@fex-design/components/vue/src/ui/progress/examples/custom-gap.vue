<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@fex-design/vue/ui/progress'
import { Slider } from '@fex-design/vue/ui/slider'

defineOptions({ name: 'ProgressCustomGapExample' })
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
      <Progress
        variant="circle"
        :value="50"
        :size="96"
        :steps="8"
        :gap="gap"
        color="var(--info)"
        linecap="butt"
        trackLinecap="butt"
        :showInfo="true"
      />
      <Progress
        variant="circle"
        :value="100"
        :size="96"
        :steps="8"
        :gap="gap"
        color="var(--success)"
        linecap="butt"
        trackLinecap="butt"
        :showInfo="true"
        :success="true"
      />
    </div>
  </div>
</template>
