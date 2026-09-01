<script setup lang="ts">
import {
  isTagPresetColor,
  type TagOptions,
  type TagPresetColor,
} from '@fex-design/core/tag/types'
import { tagClassName } from '@fex-design/styles/tag'
import { cn } from '@fex/utils'
import { computed, useAttrs } from 'vue'

defineOptions({ name: 'Tag', inheritAttrs: false })
const props = withDefaults(defineProps<TagOptions>(), {
  variant: 'filled',
  size: 'md',
  disabled: false,
})
const attrs = useAttrs()
const presetColor = computed<TagPresetColor | undefined>(() =>
  isTagPresetColor(props.color) ? props.color : undefined,
)
const rootStyle = computed(() => [
  props.color && !presetColor.value ? { '--tag-color': props.color } : undefined,
  attrs.style,
])
</script>

<template>
  <span
    v-bind="attrs"
    data-slot="tag"
    :data-color="presetColor ?? (color ? 'custom' : undefined)"
    :data-variant="variant"
    :data-size="size"
    :data-disabled="disabled ? 'true' : undefined"
    :class="cn(tagClassName({ variant, color: presetColor, size }), attrs.class as string | undefined)"
    :style="rootStyle"
  >
    <slot />
  </span>
</template>
