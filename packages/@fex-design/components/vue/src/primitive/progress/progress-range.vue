<script setup lang="ts">
import { progressLineRangeClassName } from "@fex-design/components-styles/progress"
import { getLinearProgressBackground } from "@fex-design/core/progress/progress"
import type { ProgressColor } from "@fex-design/core/progress/types"
import { cn } from "@fex-design/utils"
import { computed } from "vue"
import { useProgressContext } from "./progress-context"

defineOptions({ name: "ProgressRange" })

const props = defineProps<{
  value?: number
  offset?: number
  color?: ProgressColor
}>()

const context = useProgressContext("ProgressRange")

const percentage = computed(() => {
  if (props.value !== undefined) {
    return Math.min(1, Math.max(0, (props.value - context.value.min) / (context.value.max - context.value.min)))
  }
  return context.value.percentage
})

const rangeStyle = computed(() => {
  const width = percentage.value !== null ? `${percentage.value * 100}%` : undefined
  const left = props.offset !== undefined ? `${props.offset}%` : undefined
  const bg = getLinearProgressBackground(props.color ?? context.value.color)
  return {
    width,
    left,
    ...(bg ? { background: bg } : {}),
  }
})
</script>
<template>
  <div
    data-slot="progress-range"
    :data-status="context.value.status"
    :class="cn(progressLineRangeClassName, $attrs.class as string | undefined)"
    :style="[rangeStyle, $attrs.style as any]"
  />
</template>
