<script setup lang="ts">
import { progressLineRangeClassName } from "@fex-design/components-styles/progress"
import { cn } from "@fex-design/utils"
import { computed, useTemplateRef, type StyleValue } from "vue"
import { useProgressContext } from "./progress-context"

defineOptions({ name: "ProgressRange", inheritAttrs: false })

const props = defineProps<{
  value?: number
  offset?: number
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
  return {
    width,
    left,
  }
})
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
</script>
<template>
  <div
    ref="element"
    v-bind="$attrs"
    data-slot="progress-range"
    :data-status="context.status"
    :class="cn(progressLineRangeClassName, props.offset !== undefined && 'absolute top-0', $attrs.class as string | undefined)"
    :style="[rangeStyle, $attrs.style as StyleValue]"
  />
</template>
