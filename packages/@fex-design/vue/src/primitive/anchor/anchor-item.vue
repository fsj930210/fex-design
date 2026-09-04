<script setup lang="ts">
import type { AnchorRegisteredItem, AnchorTarget } from '@fex-design/core/anchor/types'
import { resolveAnchorTarget } from '@fex-design/core/anchor/dom'
import { anchorItemClassName } from '@fex-design/styles/anchor'
import { cn } from '@fex/utils'
import { inject, isRef, onBeforeUnmount, onMounted, provide, useAttrs, type Ref } from 'vue'
import { anchorContextKey, anchorItemContextKey } from './anchor-context'
defineOptions({ name: 'AnchorItem', inheritAttrs: false })
const props = defineProps<{ value: string; target: AnchorTarget | Ref<HTMLElement | null>; targetOffset?: number }>()
const attrs = useAttrs(); const anchor = inject(anchorContextKey); const parent = inject(anchorItemContextKey, null)
if (!anchor) throw new Error('AnchorItem must be used inside AnchorRoot')
const item: AnchorRegisteredItem = { key: props.value, target: () => isRef(props.target) ? props.target.value : resolveAnchorTarget(props.target), ...(props.targetOffset === undefined ? {} : { targetOffset: props.targetOffset }), ...(parent ? { parentKey: parent.key } : {}) }
provide(anchorItemContextKey, item)
let unregister: (() => void) | undefined
onMounted(() => { unregister = anchor.registerItem(item) })
onBeforeUnmount(() => unregister?.())
</script>
<template><li v-bind="attrs" data-slot="anchor-item" :data-active="anchor.activeKeys.value.includes(value) || undefined" :data-highlighted="anchor.highlightedKeys.value.has(value) || undefined" :class="cn(anchorItemClassName, attrs.class as string | undefined)"><slot /></li></template>
