<script setup lang="ts">
import { progressCircleRangeClassName } from '@fex-design/components-styles/progress'
import { getProgressGeometry } from '@fex-design/core/progress/progress'
import type { ProgressColor } from '@fex-design/core/progress/types'
import { cn } from '@fex-design/utils'
import { computed } from 'vue'
import { useProgressContext } from './progress-context'

defineOptions({ name: 'ProgressCircleRange' })

const props = defineProps<{
  color?: ProgressColor
  gapDegree?: number
}>()

const context = useProgressContext('ProgressCircleRange')

const size = computed(() => context.value.size ?? 48)
const thickness = computed(() => context.value.thickness ?? 4)
const geometry = computed(() =>
  getProgressGeometry({
    value: context.value.value,
    min: context.value.min,
    max: context.value.max,
    size: size.value,
    thickness: thickness.value,
    variant: context.value.variant,
    gapDegree: props.gapDegree,
  }),
)

const strokeColor = computed(() => {
  const c = props.color ?? context.value.color
  return typeof c === 'string' ? c : 'currentColor'
})
</script>
<template>
  <circle
    data-slot="progress-circle-range"
    :data-status="context.value.status"
    :cx="geometry.center"
    :cy="geometry.center"
    :r="geometry.radius"
    fill="none"
    :stroke="strokeColor"
    :stroke-width="thickness"
    :stroke-dasharray="geometry.rangeDasharray"
    :stroke-dashoffset="geometry.dashOffset"
    :stroke-linecap="context.value.linecap ?? 'round'"
    pathLength="100"
    :class="cn(progressCircleRangeClassName, $attrs.class as string | undefined)"
  />
</template>
