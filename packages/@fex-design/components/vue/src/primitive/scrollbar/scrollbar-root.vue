<script setup lang="ts">
import type { ScrollbarRootOptions, ScrollbarScrollDetail } from '@fex-design/core/scrollbar/types'
import { scrollbarRootClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { provide, useAttrs } from 'vue'
import { scrollbarKey } from './context'
import { useScrollbar } from './use-scrollbar'

defineOptions({ name: 'ScrollbarRoot', inheritAttrs: false })
// Preserve omitted Booleans: Core defaults dragScroll; showCorner inherits showTrack.
const props = withDefaults(defineProps<Omit<ScrollbarRootOptions, 'onScroll'>>(), { dragScroll: undefined, showCorner: undefined })
const emit = defineEmits<{ scrollChange: [detail: ScrollbarScrollDetail] }>()
const attrs = useAttrs()
const { root, controller } = useScrollbar(() => ({ ...props, onScroll: (detail) => emit('scrollChange', detail) }))
provide(scrollbarKey, () => props.overflow)
defineExpose({ element: root, controller })
</script>
<template>
  <div v-bind="attrs" ref="root" data-slot="scrollbar-root" :data-show-track="props.showTrack ?? false" :data-show-corner="props.showCorner ?? props.showTrack ?? false" :class="cn(scrollbarRootClassName, attrs.class as string | undefined)">
    <slot />
  </div>
</template>
