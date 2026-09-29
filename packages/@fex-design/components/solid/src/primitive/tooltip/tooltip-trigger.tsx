import { createEffect, onCleanup, type JSX } from 'solid-js'
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
}) {
  const { contentId, overlay, snapshot, triggerElement } = useTooltip('TooltipTrigger')
  createEffect(() => {
    const element = triggerElement.current
    if (!element) return
    element.dataset.state = snapshot().open ? 'open' : 'closed'
    if (snapshot().mounted) element.setAttribute('aria-describedby', contentId)
    else element.removeAttribute('aria-describedby')
  })
  onCleanup(() => {
    triggerElement.current = null
    overlay.setReferenceElement(null)
  })
  return props.children({
    ref(element) {
      triggerElement.current = element
      overlay.setReferenceElement(element)
    },
    state: snapshot(),
    props: {
      'aria-describedby': snapshot().mounted ? contentId : undefined,
      'data-state': snapshot().open ? 'open' : 'closed',
      onPointerEnter: (event) => overlay.trigger.pointerEnter(eventInfo(event)),
      onPointerLeave: (event) => overlay.trigger.pointerLeave(eventInfo(event)),
      onFocus: (event) => overlay.trigger.focus(eventInfo(event)),
      onBlur: (event) => overlay.trigger.blur(eventInfo(event)),
    },
  })
}
