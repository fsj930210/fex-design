<script setup lang="ts">
import { progressValueClassName } from "@fex-design/components-styles/progress"
import { cn } from "@fex-design/utils"
import { useTemplateRef } from 'vue'
import { useProgressContext } from "./progress-context"

defineOptions({ name: "ProgressValue", inheritAttrs: false })

const context = useProgressContext("ProgressValue")
defineSlots<{ default?: (props: { value: number | null; percentage: number | null }) => unknown }>()
const element = useTemplateRef<HTMLSpanElement>('element')
defineExpose({ element })
</script>
<template>
  <span
    ref="element"
    v-bind="$attrs"
    data-slot="progress-value"
    :data-status="context.status"
    :class="cn(progressValueClassName, $attrs.class as string | undefined)"
  >
    <slot :value="context.value" :percentage="context.percentage" />
  </span>
</template>
