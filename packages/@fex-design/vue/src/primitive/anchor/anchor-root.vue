<script setup lang="ts">
import type { AnchorActiveMode, AnchorOrientation, AnchorRegisteredItem } from '@fex-design/core/anchor/types'
import { anchorRootClassName } from '@fex-design/styles/anchor'
import { cn } from '@fex/utils'
import { computed, provide, useAttrs } from 'vue'
import { anchorContextKey } from './anchor-context'
import { useAnchor } from './use-anchor'
defineOptions({ name: 'AnchorRoot', inheritAttrs: false })
const props = withDefaults(defineProps<{ activeKeys?: readonly string[]; defaultActiveKeys?: readonly string[]; activeMode?: AnchorActiveMode; orientation?: AnchorOrientation; container?: Window | HTMLElement | (() => Window | HTMLElement); targetOffset?: number; threshold?: number; behavior?: ScrollBehavior }>(), { defaultActiveKeys: () => [], activeMode: 'current', orientation: 'vertical', targetOffset: 0, threshold: 16, behavior: 'smooth' })
const emit = defineEmits<{ change: [keys: readonly string[], items: readonly AnchorRegisteredItem[]] }>()
const attrs = useAttrs()
const anchor = useAnchor({ activeKeys: () => props.activeKeys, defaultActiveKeys: () => props.defaultActiveKeys, activeMode: () => props.activeMode, orientation: () => props.orientation, container: () => typeof props.container === 'function' ? props.container() : props.container, targetOffset: () => props.targetOffset, threshold: () => props.threshold, behavior: () => props.behavior, onChange: (keys, items) => emit('change', keys, items) })
provide(anchorContextKey, anchor)
const rootClass = computed(() => cn(anchorRootClassName({ orientation: props.orientation }), attrs.class as string | undefined))
</script>
<template><nav v-bind="attrs" :ref="(element) => anchor.root.value = element as HTMLElement" data-slot="anchor" :data-orientation="orientation" :class="rootClass"><slot /></nav></template>
