<script setup lang="ts">
import { timelineIndicatorClassName } from '@fex-design/components-styles/timeline'
import { cn } from '@fex-design/utils'
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
const className = computed(() => cn(timelineIndicatorClassName, attrs.class as string | undefined))
</script>

<template>
  <span v-bind="attrs" aria-hidden="true" data-slot="timeline-indicator" :class="className">
    <slot />
  </span>
</template>
