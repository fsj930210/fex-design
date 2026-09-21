<script setup lang="ts">
import { timelineOppositeClassName } from '@fex-design/components-styles/timeline'
import { cn } from '@fex-design/utils'
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
const className = computed(() => cn(timelineOppositeClassName, attrs.class as string | undefined))
</script>

<template>
  <div v-bind="attrs" data-slot="timeline-opposite" :class="className"><slot /></div>
</template>
