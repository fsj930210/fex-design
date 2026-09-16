<script setup lang="ts">
import { computed, useAttrs, type ComponentPublicInstance } from 'vue'
import { tooltipEventInfo, useTooltipContext } from './context'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
const { contentId, overlay, snapshot, triggerElement } = useTooltipContext('TooltipTrigger')
function setReference(element: Element | ComponentPublicInstance | null) {
  const component = element as (ComponentPublicInstance & { $el?: unknown }) | null
  const reference =
    element instanceof HTMLElement
      ? element
      : component?.$el instanceof HTMLElement
        ? component.$el
        : null
  triggerElement.value = reference
  overlay.setReferenceElement(reference)
}

function syncReferenceFromEvent(event: Event) {
  const currentTarget = event.currentTarget
  if (currentTarget instanceof HTMLElement) {
    triggerElement.value = currentTarget
    overlay.setReferenceElement(currentTarget)
  }
}

function callNativeHandler(name: string, event: Event) {
  const handlers = attrs[name]
  for (const handler of Array.isArray(handlers) ? handlers : [handlers]) {
    if (typeof handler === 'function') handler(event)
  }
}
const triggerProps = computed(() => ({
  ...attrs,
  'aria-describedby': snapshot.value.mounted
    ? [attrs['aria-describedby'], contentId].filter(Boolean).join(' ')
    : attrs['aria-describedby'],
  'data-state': snapshot.value.open ? 'open' : 'closed',
  onPointerenter(event: PointerEvent) {
    callNativeHandler('onPointerenter', event)
    if (event.defaultPrevented) return
    syncReferenceFromEvent(event)
    overlay.trigger.pointerEnter(tooltipEventInfo(event))
  },
  onPointerleave(event: PointerEvent) {
    callNativeHandler('onPointerleave', event)
    if (event.defaultPrevented) return
    syncReferenceFromEvent(event)
    overlay.trigger.pointerLeave(tooltipEventInfo(event))
  },
  onFocus(event: FocusEvent) {
    callNativeHandler('onFocus', event)
    if (event.defaultPrevented) return
    syncReferenceFromEvent(event)
    overlay.trigger.focus(tooltipEventInfo(event))
  },
  onBlur(event: FocusEvent) {
    callNativeHandler('onBlur', event)
    if (event.defaultPrevented) return
    syncReferenceFromEvent(event)
    overlay.trigger.blur(tooltipEventInfo(event))
  },
}))
</script>
<template><slot :props="triggerProps" :ref="setReference" :state="snapshot" /></template>
