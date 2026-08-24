<script setup lang="ts">
import { buttonIconClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { useAttrs, useTemplateRef } from 'vue'
import type { ButtonIconProps } from './button.types'

defineOptions({ name: 'ButtonIcon', inheritAttrs: false })

const props = withDefaults(defineProps<ButtonIconProps>(), {
  placement: 'start',
})
const attrs = useAttrs()
const iconRef = useTemplateRef<HTMLSpanElement>('icon')

function getIconAttrs() {
  return {
    ...attrs,
    class: cn(
      buttonIconClassName({ placement: props.placement, effect: props.effect }),
      attrs.class as string | undefined,
    ),
    'data-icon': attrs['data-icon'] ?? `inline-${props.placement}`,
  }
}

defineExpose({ ref: iconRef })
</script>

<template>
  <span v-bind="getIconAttrs()" ref="icon"><slot /></span>
</template>
