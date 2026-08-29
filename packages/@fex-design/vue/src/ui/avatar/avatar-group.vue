<script setup lang="ts">
import { splitOverflowItems } from '@fex-design/core/collection/split-overflow-items'
import type { AvatarGroupClassNames, AvatarGroupStyles } from '@fex-design/core/avatar/types'
import { AvatarGroup as PrimitiveAvatarGroup, AvatarGroupCount } from '../../primitive/avatar/avatar'
import { Fragment, computed, useSlots, type StyleValue, type VNode } from 'vue'
const props = defineProps<{ maxCount?: number; class?: string; classNames?: AvatarGroupClassNames; styles?: AvatarGroupStyles<StyleValue> }>()
const slots = useSlots()
function flatten(nodes: readonly VNode[]): VNode[] { return nodes.flatMap((node) => node.type === Fragment && Array.isArray(node.children) ? flatten(node.children as VNode[]) : [node]) }
const items = computed(() => flatten(slots.default?.() ?? []))
const split = computed(() => splitOverflowItems(items.value, props.maxCount))
</script>
<template>
  <PrimitiveAvatarGroup :class="[props.class, props.classNames?.root]" :style="props.styles?.root">
    <component :is="item" v-for="(item, index) in split.visibleItems" :key="item.key ?? index" />
    <slot v-if="split.overflowCount" name="overflow" :count="split.overflowCount" :items="split.overflowItems"><AvatarGroupCount :class="props.classNames?.overflow" :style="props.styles?.overflow">+{{ split.overflowCount }}</AvatarGroupCount></slot>
  </PrimitiveAvatarGroup>
</template>
