import { createEffect, createSignal, onCleanup, type JSX } from 'solid-js'
import type { createTooltip } from '@fex-design/core/tooltip/create-tooltip'
import { useTooltip } from './tooltip-context'
import { eventInfo } from './event-info'

export interface TooltipTriggerRenderProps {
  props: {
    'aria-describedby': string | undefined
    'data-state': 'open' | 'closed'
    onBlur: JSX.FocusEventHandlerUnion<HTMLElement, FocusEvent>
    onFocus: JSX.FocusEventHandlerUnion<HTMLElement, FocusEvent>
    onPointerEnter: JSX.EventHandlerUnion<HTMLElement, PointerEvent>
    onPointerLeave: JSX.EventHandlerUnion<HTMLElement, PointerEvent>
  }
  ref: (element: HTMLElement) => void
  state: ReturnType<ReturnType<typeof createTooltip>['getSnapshot']>
}

export function TooltipTrigger(props: {
  children: (props: TooltipTriggerRenderProps) => JSX.Element
  'aria-describedby'?: string
}) {
  const { contentId, overlay, snapshot, triggerElement } = useTooltip('TooltipTrigger')
  const [element, setElement] = createSignal<HTMLElement>()
  const [originalDescription, setOriginalDescription] = createSignal<string>()
  const description = () =>
    [
      ...new Set([
        ...(props['aria-describedby'] ?? originalDescription() ?? '').split(/\s+/).filter(Boolean),
        ...(snapshot().mounted ? [contentId] : []),
      ]),
    ].join(' ') || undefined
  const restoreDescription = (node: HTMLElement) => {
    const original = originalDescription()
    if (original) node.setAttribute('aria-describedby', original)
    else node.removeAttribute('aria-describedby')
  }
  // Synchronize the actual trigger DOM and preserve caller-owned description IDs.
  createEffect(() => {
    const node = element()
    if (!node) return
    node.dataset.state = snapshot().open ? 'open' : 'closed'
    const ids = description()
    if (ids) node.setAttribute('aria-describedby', ids)
    else node.removeAttribute('aria-describedby')
  })
  onCleanup(() => {
    const node = element()
    if (node) restoreDescription(node)
    triggerElement.current = null
    overlay.setReferenceElement(null)
  })
  return props.children({
    ref(node) {
      const previous = element()
      if (previous && previous !== node) restoreDescription(previous)
      setOriginalDescription(
        node
          .getAttribute('aria-describedby')
          ?.split(/\s+/)
          .filter((id) => id !== contentId)
          .join(' '),
      )
      setElement(node)
      triggerElement.current = node
      overlay.setReferenceElement(node)
    },
    state: {
      get open() {
        return snapshot().open
      },
      get mounted() {
        return snapshot().mounted
      },
      get phase() {
        return snapshot().phase
      },
      get placement() {
        return snapshot().placement
      },
      get side() {
        return snapshot().side
      },
      get align() {
        return snapshot().align
      },
      get referenceHidden() {
        return snapshot().referenceHidden
      },
      get escaped() {
        return snapshot().escaped
      },
      get trigger() {
        return snapshot().trigger
      },
    },
    props: {
      get 'aria-describedby'() {
        return description()
      },
      get 'data-state'() {
        return snapshot().open ? 'open' : 'closed'
      },
      onPointerEnter: (event) => {
        if (!event.defaultPrevented) overlay.trigger.pointerEnter(eventInfo(event))
      },
      onPointerLeave: (event) => {
        if (!event.defaultPrevented) overlay.trigger.pointerLeave(eventInfo(event))
      },
      onFocus: (event) => {
        if (!event.defaultPrevented) overlay.trigger.focus(eventInfo(event))
      },
      onBlur: (event) => {
        if (!event.defaultPrevented) overlay.trigger.blur(eventInfo(event))
      },
    },
  })
}
