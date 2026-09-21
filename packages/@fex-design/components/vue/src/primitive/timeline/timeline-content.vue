<script setup lang="ts">
import { timelineContentClassName } from '@fex-design/components-styles/timeline'
import { cn } from '@fex-design/utils'
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
const className = computed(() => cn(timelineContentClassName, attrs.class as string | undefined))
</script>

<template>
  <div v-bind="attrs" data-slot="timeline-content" :class="className"><slot /></div>
</template>
