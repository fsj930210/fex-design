<script setup lang="ts">
import type { SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
import { skeletonInputBlockClassName, skeletonInputClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
import SkeletonBlock from './skeleton-block.vue'
defineOptions({ name: 'SkeletonInput', inheritAttrs: false })
const props = defineProps<SkeletonVisualOptions & { block?: boolean }>()
const attrs = useAttrs()
</script>
<template><SkeletonBlock v-bind="attrs" data-slot="skeleton-input" :animation="props.animation" :class="cn(skeletonInputClassName, props.block && skeletonInputBlockClassName, attrs.class as string | undefined)" /></template>
