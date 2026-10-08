<script setup lang="ts">
import { progressLineClassName } from '@fex-design/components-styles/progress'
import { cn } from '@fex-design/utils'
import { useTemplateRef, type StyleValue } from 'vue'
import { useProgressContext } from './progress-context'

defineOptions({ name: 'ProgressTrack', inheritAttrs: false })

const context = useProgressContext('ProgressTrack')
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
</script>
<template>
  <div
    ref="element"
    v-bind="$attrs"
    data-slot="progress-track"
    :data-status="context.status"
    :class="cn(progressLineClassName, $attrs.class as string | undefined)"
    :style="[{ height: `${context.thickness}px` }, $attrs.style as StyleValue]"
  >
    <slot />
  </div>
</template>
