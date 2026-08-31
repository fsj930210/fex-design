<script setup lang="ts">
import { isBadgePresetColor, type BadgeOptions } from '@fex-design/core'
import { badgeClassName } from '@fex-design/styles/badge'
import { cn } from '@fex/utils'
import { computed, useAttrs } from 'vue'

defineOptions({ name: 'Badge', inheritAttrs: false })

const props = defineProps<BadgeOptions>()

const attrs = useAttrs()
const presetColor = computed(() => (isBadgePresetColor(props.color) ? props.color : undefined))
const customColor = computed(() => (props.color && !presetColor.value ? props.color : undefined))
const value = computed(() =>
  typeof props.count === 'number' &&
  props.overflowCount != null &&
  props.count > props.overflowCount
    ? `${props.overflowCount}+`
    : props.count,
)
const visible = computed(
  () => (value.value != null && (value.value !== 0 || props.showZero)) || value.value == null,
)
</script>

<template>
  <span
    v-if="visible"
    v-bind="attrs"
    data-slot="badge"
    :data-color="props.color ?? 'default'"
    :class="cn(badgeClassName({ color: presetColor }), attrs.class as string | undefined)"
    :style="[{ '--badge-color': customColor }, attrs.style]"
  >
    {{ value ?? '' }}<slot v-if="value == null" />
  </span>
</template>
