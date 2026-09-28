<script setup lang="ts">
import { progressCircleTrackClassName } from '@fex-design/components-styles/progress'
import { getProgressGeometry } from '@fex-design/core/progress/progress'
import { cn } from '@fex-design/utils'
import { computed } from 'vue'
import { useProgressContext } from './progress-context'

defineOptions({ name: 'ProgressCircleTrack' })

const props = defineProps<{ gapDegree?: number }>()
const context = useProgressContext('ProgressCircleTrack')

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
</script>
<template>
  <circle
    data-slot="progress-circle-track"
    :cx="geometry.center"
    :cy="geometry.center"
    :r="geometry.radius"
    fill="none"
    :stroke="context.value.trackColor ?? 'currentColor'"
    :stroke-width="thickness"
    :stroke-dasharray="geometry.trackDasharray"
    :stroke-linecap="context.value.trackLinecap ?? 'round'"
    pathLength="100"
    :class="cn(progressCircleTrackClassName, $attrs.class as string | undefined)"
  />
</template>
