<script setup lang="ts">
import type { AnchorClassNames, AnchorStyles } from '@fex-design/core/anchor/types'
import { cn } from '@fex/utils'
import type { StyleValue } from 'vue'
import { useAttrs } from 'vue'
import { AnchorIndicator, AnchorRail, AnchorRoot } from '../../primitive/anchor/anchor'
import AnchorItems from './anchor-items.vue'
import type { AnchorItem } from './anchor.types'
defineOptions({ name: 'Anchor', inheritAttrs: false })
withDefaults(defineProps<{ items: readonly AnchorItem<string>[]; activeKeys?: readonly string[]; defaultActiveKeys?: readonly string[]; activeMode?: 'current' | 'progress'; orientation?: 'vertical' | 'horizontal'; container?: Window | HTMLElement | (() => Window | HTMLElement); targetOffset?: number; threshold?: number; behavior?: ScrollBehavior; classNames?: AnchorClassNames; styles?: AnchorStyles<StyleValue> }>(), { defaultActiveKeys: () => [], activeMode: 'current', orientation: 'vertical', targetOffset: 0, threshold: 16, behavior: 'smooth', classNames: () => ({}), styles: () => ({}) })
const emit = defineEmits<{ change: [keys: readonly string[], items: readonly import('@fex-design/core/anchor/types').AnchorRegisteredItem[]]; itemClick: [event: MouseEvent, item: AnchorItem<string>] }>()
const attrs = useAttrs()
</script>
<template><AnchorRoot v-bind="attrs" :active-keys="activeKeys" :default-active-keys="defaultActiveKeys" :active-mode="activeMode" :orientation="orientation" :container="container" :target-offset="targetOffset" :threshold="threshold" :behavior="behavior" :class="cn(attrs.class as string | undefined, classNames.root)" :style="[attrs.style, styles.root]" @change="(keys, entries) => emit('change', keys, entries)"><AnchorRail :class="classNames.rail" :style="styles.rail"><AnchorIndicator :class="classNames.indicator" :style="styles.indicator" /></AnchorRail><AnchorItems :items="items" :class-names="classNames" :styles="styles" @item-click="(event, item) => emit('itemClick', event, item)" /></AnchorRoot></template>
