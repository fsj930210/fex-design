<script setup lang="ts">
import type { SkeletonButtonShape, SkeletonButtonSize, SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
import { skeletonButtonClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
import SkeletonBlock from './skeleton-block.vue'
defineOptions({ name: 'SkeletonButton', inheritAttrs: false })
const props = defineProps<SkeletonVisualOptions & { block?: boolean; shape?: SkeletonButtonShape; size?: SkeletonButtonSize }>()
const attrs = useAttrs()
</script>
<template><SkeletonBlock v-bind="attrs" data-slot="skeleton-button" :animation="props.animation" :class="cn(skeletonButtonClassName({ block: props.block, shape: props.shape, size: props.size }), attrs.class as string | undefined)" /></template>
