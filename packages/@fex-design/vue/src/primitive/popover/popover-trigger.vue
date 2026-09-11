<script setup lang="ts">
import { computed, useAttrs, type ComponentPublicInstance } from 'vue'
import { usePopoverContext } from './context'
import { eventInfo } from './context'

defineOptions({ name: 'PopoverTrigger', inheritAttrs: false })

const attrs = useAttrs()
const { overlay, snapshot, triggerElement } = usePopoverContext('PopoverTrigger')

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
  type: attrs.type ?? 'button',
  'aria-haspopup': 'dialog' as const,
  'aria-expanded': snapshot.value.open,
  'data-state': snapshot.value.open ? 'open' : 'closed',
  onClick(event: MouseEvent) {
    callNativeHandler('onClick', event)
    if (event.defaultPrevented) return
    syncReferenceFromEvent(event)
    overlay.trigger.click(eventInfo(event))
  },
  onPointerenter(event: PointerEvent) {
    callNativeHandler('onPointerenter', event)
    if (event.defaultPrevented) return
    syncReferenceFromEvent(event)
    overlay.trigger.pointerEnter(eventInfo(event))
  },
  onPointerleave(event: PointerEvent) {
    callNativeHandler('onPointerleave', event)
    if (event.defaultPrevented) return
    syncReferenceFromEvent(event)
    overlay.trigger.pointerLeave(eventInfo(event))
  },
  onFocus(event: FocusEvent) {
    callNativeHandler('onFocus', event)
    if (event.defaultPrevented) return
    syncReferenceFromEvent(event)
    overlay.trigger.focus(eventInfo(event))
  },
  onBlur(event: FocusEvent) {
    callNativeHandler('onBlur', event)
    if (event.defaultPrevented) return
    syncReferenceFromEvent(event)
    overlay.trigger.blur(eventInfo(event))
  },
  onContextmenu(event: MouseEvent) {
    callNativeHandler('onContextmenu', event)
    if (event.defaultPrevented) return
    syncReferenceFromEvent(event)
    overlay.trigger.contextMenu(eventInfo(event))
  },
}))
</script>

<template>
  <slot :props="triggerProps" :ref="setReference" :state="snapshot" />
</template>
