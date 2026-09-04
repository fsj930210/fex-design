<script setup lang="ts">
import { anchorIndicatorClassName } from '@fex-design/styles/anchor'
import { cn } from '@fex/utils'
import { inject, useAttrs } from 'vue'
import { anchorContextKey } from './anchor-context'
defineOptions({ name: 'AnchorIndicator', inheritAttrs: false })
const attrs = useAttrs(); const anchor = inject(anchorContextKey)
if (!anchor) throw new Error('AnchorIndicator must be used inside AnchorRoot')
</script>
<template><span v-for="(inkStyle, index) in anchor.inkStyles.value" v-bind="attrs" :key="index" data-slot="anchor-indicator" :class="cn(anchorIndicatorClassName({ orientation: anchor.orientation.value }), attrs.class as string | undefined)" :style="[attrs.style, { top: inkStyle.top === undefined ? undefined : `${inkStyle.top}px`, left: inkStyle.left === undefined ? undefined : `${inkStyle.left}px`, width: inkStyle.width === undefined ? undefined : `${inkStyle.width}px`, height: inkStyle.height === undefined ? undefined : `${inkStyle.height}px` }]" /></template>
