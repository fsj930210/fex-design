<script setup lang="ts">
import type { SkeletonAvatarOptions } from '@fex-design/core/skeleton/types'
import { skeletonAvatarClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
import SkeletonBlock from './skeleton-block.vue'
defineOptions({ name: 'SkeletonAvatar', inheritAttrs: false })
const props = defineProps<SkeletonAvatarOptions>()
const attrs = useAttrs()
</script>
<template><SkeletonBlock v-bind="attrs" data-slot="skeleton-avatar" :animation="props.animation" :class="cn(skeletonAvatarClassName({ shape: props.shape, size: props.size }), attrs.class as string | undefined)" /></template>
