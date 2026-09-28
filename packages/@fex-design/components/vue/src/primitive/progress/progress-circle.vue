<script setup lang="ts">
import { progressCircleClassName } from '@fex-design/components-styles/progress'
import { getProgressGeometry } from '@fex-design/core/progress/progress'
import { cn } from '@fex-design/utils'
import { computed } from 'vue'
import { useProgressContext } from './progress-context'

defineOptions({ name: 'ProgressCircle' })

const props = defineProps<{ gapDegree?: number }>()
const context = useProgressContext('ProgressCircle')

const size = computed(() => context.value.size ?? 48)
const geometry = computed(() =>
  getProgressGeometry({
    value: context.value.value,
    min: context.value.min,
    max: context.value.max,
    size: size.value,
    thickness: context.value.thickness ?? 4,
    variant: context.value.variant,
    gapDegree: props.gapDegree,
  }),
)
</script>
<template>
  <svg
    data-slot="progress-circle"
    :data-status="context.value.status"
    :viewBox="`0 0 ${size} ${size}`"
    :width="size"
    :height="size"
    :class="cn(progressCircleClassName, $attrs.class as string | undefined)"
    :style="[{ transform: `rotate(${geometry.rotation}deg)` }, $attrs.style as any]"
  >
    <slot />
  </svg>
</template>
