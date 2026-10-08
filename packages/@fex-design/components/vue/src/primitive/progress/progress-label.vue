<script setup lang="ts">
import { progressLabelClassName } from "@fex-design/components-styles/progress"
import { cn } from "@fex-design/utils"
import { useTemplateRef } from 'vue'

defineOptions({ name: "ProgressLabel", inheritAttrs: false })
const element = useTemplateRef<HTMLSpanElement>('element')
defineExpose({ element })
</script>
<template>
  <span
    ref="element"
    v-bind="$attrs"
    data-slot="progress-label"
    :class="cn(progressLabelClassName, $attrs.class as string | undefined)"
  >
    <slot />
  </span>
</template>
