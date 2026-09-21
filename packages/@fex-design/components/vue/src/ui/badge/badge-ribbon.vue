<script setup lang="ts">
import PrimitiveBadgeRibbon from '@fex-design/vue/primitive/badge/badge-ribbon.vue'
import type { BadgeRibbonOptions } from '@fex-design/core'
import { badgeRibbonRootClassName } from '@fex-design/components-styles/badge'
import { cn } from '@fex-design/utils'
import { computed } from 'vue'

defineOptions({ name: 'BadgeRibbon' })
const props = defineProps<BadgeRibbonOptions & { text?: string; class?: string }>()
const ribbonProps = computed(() => ({
  ...(props.color !== undefined ? { color: props.color } : {}),
  ...(props.placement !== undefined ? { placement: props.placement } : {}),
}))
</script>

<template>
  <div data-slot="badge-ribbon-root" :class="cn(badgeRibbonRootClassName, props.class)">
    <div data-slot="badge-ribbon-content"><slot /></div>
    <PrimitiveBadgeRibbon v-bind="ribbonProps"
      >{{ props.text }}<slot name="text"
    /></PrimitiveBadgeRibbon>
  </div>
</template>
