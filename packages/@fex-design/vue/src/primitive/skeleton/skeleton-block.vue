<script setup lang="ts">
import type { SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
import { skeletonAnimationVariants, skeletonBaseClassName, skeletonBlockClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
defineOptions({ name: 'SkeletonBlock', inheritAttrs: false })
const props = defineProps<SkeletonVisualOptions>()
const attrs = useAttrs()
</script>
<template><div v-bind="attrs" aria-hidden="true" data-slot="skeleton-block" :class="cn(skeletonBaseClassName, skeletonBlockClassName, skeletonAnimationVariants({ animation: props.animation }), attrs.class as string | undefined)"><slot /></div></template>
