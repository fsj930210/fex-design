<script setup lang="ts">
import { progressCircleClassName } from '@fex-design/components-styles/progress'
import { getProgressGeometry } from '@fex-design/core/progress/progress'
import { cn } from '@fex-design/utils'
import { computed, useTemplateRef, type StyleValue } from 'vue'
import { useProgressContext } from './progress-context'

defineOptions({ name: 'ProgressCircle', inheritAttrs: false })

const props = defineProps<{ gapDegree?: number; rotation?: number }>()
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
const element = useTemplateRef<SVGSVGElement>('element')
defineExpose({ element })
</script>
<template>
  <svg
    ref="element"
    v-bind="$attrs"
    data-slot="progress-circle"
    :data-status="context.status"
    :viewBox="`0 0 ${size} ${size}`"
    :width="size"
    :height="size"
    :class="cn(progressCircleClassName, $attrs.class as string | undefined)"
    :style="[{ transform: `rotate(${props.rotation ?? geometry.rotation}deg)` }, $attrs.style as StyleValue]"
  >
    <slot />
  </svg>
</template>
