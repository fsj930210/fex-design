<script setup lang="ts">
import { isBadgePresetColor, type BadgeRibbonOptions } from '@fex-design/core'
import {
  badgeRibbonClassName,
  badgeRibbonColorClassName,
  badgeRibbonTextClassName,
} from '@fex-design/styles/badge'
import { cn } from '@fex/utils'
import { computed } from 'vue'
defineOptions({ name: 'BadgeRibbon' })
const props = withDefaults(defineProps<BadgeRibbonOptions & { class?: string }>(), {
  color: 'primary',
  placement: 'end',
})
const presetColor = computed(() => (isBadgePresetColor(props.color) ? props.color : undefined))
const customColor = computed(() => (props.color && !presetColor.value ? props.color : undefined))
</script>
<template>
  <span
    data-slot="badge-ribbon"
    :data-color="props.color"
    :data-placement="props.placement"
    :class="
      cn(
        badgeRibbonClassName,
        badgeRibbonColorClassName({ color: presetColor ?? 'primary' }),
        props.class,
      )
    "
    :style="{ '--badge-color': customColor }"
  >
    <span data-slot="badge-ribbon-text" :class="badgeRibbonTextClassName">
      <slot />
    </span>
  </span>
</template>
