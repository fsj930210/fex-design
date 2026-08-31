<script setup lang="ts">
import type { BadgeGroupOptions } from '@fex-design/core'
import { splitOverflowItems } from '@fex-design/core/collection/split-overflow-items'
import { badgeClassName, badgeGroupClassName } from '@fex-design/styles/badge'
import { cn } from '@fex/utils'
import { computed, Fragment, useSlots, type VNode } from 'vue'

defineOptions({ name: 'BadgeGroup' })
const props = defineProps<BadgeGroupOptions & { class?: string }>()
const slots = useSlots()
function flatten(nodes: readonly VNode[]): VNode[] {
  return nodes.flatMap((node) =>
    node.type === Fragment && Array.isArray(node.children)
      ? flatten(node.children as VNode[])
      : [node],
  )
}
const items = computed(() => flatten(slots.default?.() ?? []))
const split = computed(() => splitOverflowItems(items.value, props.maxCount))
</script>

<template>
  <div data-slot="badge-group" :class="cn(badgeGroupClassName, props.class)">
    <component
      :is="item"
      v-for="(item, index) in split.visibleItems"
      :key="item.key ?? index"
    /><slot
      v-if="split.overflowCount"
      name="overflow"
      :count="split.overflowCount"
      :items="split.overflowItems"
      ><span data-slot="badge" :class="badgeClassName()">+{{ split.overflowCount }}</span></slot
    >
  </div>
</template>
