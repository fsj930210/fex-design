<script setup lang="ts">
import { progressLineClassName } from '@fex-design/components-styles/progress'
import { cn } from '@fex-design/utils'
import { useProgressContext } from './progress-context'

defineOptions({ name: 'ProgressTrack' })

const context = useProgressContext('ProgressTrack')
</script>
<template>
  <div
    data-slot="progress-track"
    :data-status="context.value.status"
    :class="cn(progressLineClassName, $attrs.class as string | undefined)"
    :style="[{ backgroundColor: context.value.trackColor }, $attrs.style as any]"
  >
    <slot />
  </div>
</template>
