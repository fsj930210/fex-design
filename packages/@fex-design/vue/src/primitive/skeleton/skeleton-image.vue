<script setup lang="ts">
import type { SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
import { skeletonImageClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
import SkeletonBlock from './skeleton-block.vue'
defineOptions({ name: 'SkeletonImage', inheritAttrs: false })
const props = defineProps<SkeletonVisualOptions>()
const attrs = useAttrs()
</script>
<template><SkeletonBlock v-bind="attrs" data-slot="skeleton-image" :animation="props.animation" :class="cn(skeletonImageClassName, attrs.class as string | undefined)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M4 5h16v14H4z" /><circle cx="9" cy="10" r="2" /><path d="m4 17 4-4 3 3 2-2 7 5" /></svg></SkeletonBlock></template>
