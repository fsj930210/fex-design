<script setup lang="ts">
import { anchorLinkClassName } from '@fex-design/styles/anchor'
import { cn } from '@fex/utils'
import { inject, useAttrs } from 'vue'
import { anchorContextKey, anchorItemContextKey } from './anchor-context'
defineOptions({ name: 'AnchorLink', inheritAttrs: false })
const attrs = useAttrs(); const anchor = inject(anchorContextKey); const item = inject(anchorItemContextKey)
if (!anchor || !item) throw new Error('AnchorLink must be used inside AnchorItem')
function click(event: MouseEvent) { if (!event.defaultPrevented) anchor!.activate(item!) }
</script>
<template><button v-bind="attrs" type="button" data-slot="anchor-link" :data-anchor-key="item.key" :data-state="anchor.activeKeys.value.includes(item.key) ? 'active' : 'inactive'" :class="cn(anchorLinkClassName({ orientation: anchor.orientation.value, active: anchor.highlightedKeys.value.has(item.key) }), attrs.class as string | undefined)" @click="click"><slot /></button></template>
