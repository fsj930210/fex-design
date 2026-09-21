<script setup lang="ts">
import type { ScrollbarAxis } from '@fex-design/core/scrollbar/types'
import { scrollbarThumbClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'
defineOptions({ inheritAttrs: false })
const props = defineProps<{ axis: ScrollbarAxis }>()
const attrs = useAttrs()
</script>
<template>
  <div
    v-bind="attrs"
    data-slot="scrollbar-thumb"
    :class="cn(scrollbarThumbClassName({ axis: props.axis }), attrs.class as string | undefined)"
  />
</template>
