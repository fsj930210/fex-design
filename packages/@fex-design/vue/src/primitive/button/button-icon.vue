<script setup lang="ts">
import { buttonIconClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { useAttrs, useTemplateRef } from 'vue'

defineOptions({ name: 'ButtonIcon', inheritAttrs: false })

const attrs = useAttrs()
const iconRef = useTemplateRef<HTMLSpanElement>('icon')

function getIconAttrs() {
  const placement = attrs.placement === 'end' ? 'end' : 'start'
  return {
    ...attrs,
    placement: undefined,
    'data-icon': attrs['data-icon'] ?? (placement === 'end' ? 'inline-end' : 'inline-start'),
    class: cn(buttonIconClassName(), attrs.class as string | undefined),
  }
}

defineExpose({ ref: iconRef })
</script>

<template>
  <span v-bind="getIconAttrs()" ref="icon"><slot /></span>
</template>
