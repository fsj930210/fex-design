<script setup lang="ts">
import type { ScrollbarAxis } from '@fex-design/core/scrollbar/types'
import { scrollbarThumbClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { useAttrs, useTemplateRef } from 'vue'
defineOptions({ name: 'ScrollbarThumb', inheritAttrs: false })
const props = defineProps<{ axis: ScrollbarAxis }>()
const attrs = useAttrs()
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
</script>
<template>
  <div
    ref="element"
    v-bind="attrs"
    data-slot="scrollbar-thumb"
    :data-axis="props.axis"
    :class="cn(scrollbarThumbClassName({ axis: props.axis }), attrs.class as string | undefined)"
  >
    <slot />
  </div>
</template>
