<script setup lang="ts">
import type { ScrollbarAxis } from '@fex-design/core/scrollbar/types'
import { scrollbarBarClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { useAttrs, useTemplateRef } from 'vue'
defineOptions({ name: 'ScrollbarBar', inheritAttrs: false })
const props = defineProps<{ axis: ScrollbarAxis }>()
const attrs = useAttrs()
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
</script>
<template>
  <div
    ref="element"
    v-bind="attrs"
    data-slot="scrollbar-bar"
    :data-axis="props.axis"
    data-visible="false"
    :class="cn(scrollbarBarClassName({ axis: props.axis }), attrs.class as string | undefined)"
  >
    <slot />
  </div>
</template>
