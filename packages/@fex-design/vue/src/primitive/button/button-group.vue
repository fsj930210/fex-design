<script setup lang="ts">
import { buttonGroupClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { useAttrs, type CSSProperties, type StyleValue } from 'vue'
import type { ButtonGroupProps } from './button.types'

defineOptions({ name: 'ButtonGroup', inheritAttrs: false })
const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
  spacing: 0,
})
const attrs = useAttrs()

function getButtonGroupAttrs() {
  const gapStyle: CSSProperties = {
    gap: typeof props.spacing === 'number' ? `${props.spacing}px` : props.spacing,
  }

  return {
    ...attrs,
    class: cn(
      buttonGroupClassName({
        orientation: props.orientation,
        connected: props.spacing === 0,
      }),
      attrs.class as string | undefined,
    ),
    style: [attrs.style as StyleValue, gapStyle],
  }
}
</script>

<template>
  <div
    v-bind="getButtonGroupAttrs()"
    role="group"
    data-slot="button-group"
    :data-orientation="props.orientation"
  >
    <slot />
  </div>
</template>
