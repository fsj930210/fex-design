<script setup lang="ts">
import { computed } from 'vue'
import { Progress, ProgressCircle, ProgressValue } from '@fex-design/vue/primitive/progress'
import { CheckIcon } from '@fex-design/vue/icons/check'
import { getCircleStepsGeometry } from '@fex-design/core/progress/progress'

defineOptions({ name: 'StepRingDemo' })
const props = withDefaults(defineProps<{ value: number; gap?: number; steps?: number; color?: string }>(), { gap: 2, steps: 10 })
const geometry = computed(() => getCircleStepsGeometry({ value: props.value, gap: props.gap, steps: props.steps, size: 96, thickness: 4 }))
const ringColor = computed(() => props.color ?? (props.value === 100 ? 'var(--success)' : 'var(--info)'))
</script>

<template>
  <Progress :value="value" variant="circle" :size="96" :thickness="4" class="relative">
    <ProgressCircle>
      <circle
        v-for="step in geometry.steps"
        :key="step.index"
        :cx="48"
        :cy="48"
        :r="geometry.radius"
        fill="none"
        :stroke="step.active ? ringColor : 'var(--progress-remaining)'"
        :stroke-width="4"
        :stroke-dasharray="geometry.stepDasharray"
        :stroke-dashoffset="step.offset"
        stroke-linecap="butt"
        :pathLength="geometry.circumference"
      />
    </ProgressCircle>
    <div class="absolute inset-0 flex items-center justify-center">
      <template v-if="value === 100">
        <CheckIcon class="size-5 text-success" />
      </template>
      <template v-else>
        <ProgressValue class="text-sm">
          {{ value }}%
        </ProgressValue>
      </template>
    </div>
  </Progress>
</template>
