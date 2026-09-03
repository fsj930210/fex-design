<script setup lang="ts">
import { skeletonTextClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
import SkeletonBlock from './skeleton-block.vue'
defineOptions({ name: 'SkeletonText', inheritAttrs: false })
defineProps<{ animation?: 'none' | 'pulse' | 'wave'; round?: boolean }>()
const attrs = useAttrs()
</script>
<template><SkeletonBlock v-bind="attrs" data-slot="skeleton-text" :animation="animation" :class="cn(skeletonTextClassName, round && 'rounded-full', attrs.class as string | undefined)" /></template>
