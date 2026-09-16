<script setup lang="ts">
import { tooltipContentClassName } from '@fex-design/styles/tooltip'
import { cn } from '@fex/utils'
import type { ComponentPublicInstance, StyleValue } from 'vue'
import { computed, onBeforeUnmount, useAttrs } from 'vue'
import { useTooltipContext } from './context'
defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string; style?: StyleValue; color?: string }>()
const attrs = useAttrs()
const { contentId, overlay, snapshot } = useTooltipContext('TooltipContent')
const contentClass = computed(() => cn(tooltipContentClassName, props.class))
function pointerEnter(event: PointerEvent) {
  overlay.content.pointerEnter({ target: event.target, currentTarget: event.currentTarget, event })
}
function pointerLeave(event: PointerEvent) {
  overlay.content.pointerLeave({ target: event.target, currentTarget: event.currentTarget, event })
}
function setContent(element: Element | ComponentPublicInstance | null) {
  overlay.setFloatingElement(element instanceof HTMLDivElement ? element : null)
}
onBeforeUnmount(() => overlay.setFloatingElement(null))
</script>
<template>
  <div
    v-if="snapshot.mounted"
    v-bind="attrs"
    :id="contentId"
    :ref="setContent"
    role="tooltip"
    data-slot="tooltip-content"
    :data-state="snapshot.open ? 'open' : 'closed'"
    :data-phase="snapshot.phase"
    :data-side="snapshot.side"
    :data-align="snapshot.align"
    :data-placement="snapshot.placement"
    :class="contentClass"
    @pointerenter="pointerEnter"
    @pointerleave="pointerLeave"
    :style="[
      {
        position: 'var(--floating-strategy, absolute)',
        left: 'var(--floating-x, 0px)',
        top: 'var(--floating-y, 0px)',
        transformOrigin: 'var(--floating-transform-origin)',
      },
      props.color ? { '--tooltip-background': props.color } : undefined,
      props.style,
    ]"
  >
    <slot />
  </div>
</template>
