<script setup lang="ts">
import { isBadgePresetColor, type BadgeDotOptions } from '@fex-design/core'
import { badgeDotClassName, badgeDotColorClassName } from '@fex-design/styles/badge'
import { cn } from '@fex/utils'
import { computed, useAttrs } from 'vue'
defineOptions({ name: 'BadgeDot', inheritAttrs: false })
const props = defineProps<BadgeDotOptions & { size?: 'sm' | 'md' | 'lg' }>()
const attrs = useAttrs()
const presetColor = computed(() => (isBadgePresetColor(props.color) ? props.color : undefined))
const customColor = computed(() => (props.color && !presetColor.value ? props.color : undefined))
</script>
<template>
  <span
    v-bind="attrs"
    data-slot="badge-dot"
    :data-color="color ?? 'default'"
    :data-size="props.size ?? 'md'"
    :class="cn(badgeDotClassName({ size: props.size }), badgeDotColorClassName({ color: presetColor }), attrs.class)"
    :style="[{ '--badge-color': customColor }, attrs.style]"
  />
</template>
