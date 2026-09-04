<script setup lang="ts">
import { anchorRailClassName } from '@fex-design/styles/anchor'
import { cn } from '@fex/utils'
import { inject, useAttrs } from 'vue'
import { anchorContextKey } from './anchor-context'
defineOptions({ name: 'AnchorRail', inheritAttrs: false })
const attrs = useAttrs(); const anchor = inject(anchorContextKey)
if (!anchor) throw new Error('AnchorRail must be used inside AnchorRoot')
</script>
<template><div v-bind="attrs" aria-hidden="true" data-slot="anchor-rail" :class="cn(anchorRailClassName({ orientation: anchor.orientation.value }), attrs.class as string | undefined)"><slot /></div></template>
