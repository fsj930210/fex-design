<script setup lang="ts">
import { scrollbarCornerClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { useAttrs, useTemplateRef } from 'vue'
defineOptions({ name: 'ScrollbarCorner', inheritAttrs: false })
const attrs = useAttrs()
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
</script>
<template>
  <div
    ref="element"
    v-bind="attrs"
    data-slot="scrollbar-corner"
    :class="cn(scrollbarCornerClassName, attrs.class as string | undefined)"
  >
    <slot />
  </div>
</template>
