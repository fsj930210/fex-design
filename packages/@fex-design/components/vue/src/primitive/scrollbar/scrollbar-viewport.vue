<script setup lang="ts">
import { scrollbarViewportClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { computed, inject, ref, useAttrs } from 'vue'
import type { ScrollbarOverflow } from '@fex-design/core/scrollbar/types'
import { resolveScrollbarOverflow } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import { scrollbarKey } from './context'
defineOptions({ name: 'ScrollbarViewport', inheritAttrs: false })
const props = defineProps<{ overflow?: ScrollbarOverflow }>()
const parent = inject(scrollbarKey, () => undefined)
const overflow = computed(() => resolveScrollbarOverflow(props.overflow, parent()))
const attrs = useAttrs()
const element = ref<HTMLDivElement | null>(null)
defineExpose({ element })
</script>
<template>
  <div
    ref="element"
    v-bind="attrs"
    data-slot="scrollbar-viewport"
    :class="
      cn(
        scrollbarViewportClassName({ overflowX: overflow.x, overflowY: overflow.y }),
        attrs.class as string | undefined,
      )
    "
  >
    <slot />
  </div>
</template>
