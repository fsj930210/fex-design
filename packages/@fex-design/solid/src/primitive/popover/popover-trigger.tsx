import { mergeProps, onCleanup, splitProps, type JSX } from 'solid-js'
import type { PopoverController } from '@fex-design/core/popover/create-popover'
import { usePopover } from './popover-context'
import { eventInfo, callEventHandler } from './event-info'

export type PopoverTriggerRenderProps = {
  props: JSX.ButtonHTMLAttributes<HTMLButtonElement>
  ref: (element: HTMLButtonElement) => void
  readonly state: ReturnType<PopoverController['getSnapshot']>
}

export type PopoverTriggerProps = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children: (props: PopoverTriggerRenderProps) => JSX.Element
}

export function PopoverTrigger(props: PopoverTriggerProps) {
  const [local, rest] = splitProps(props, ['children', 'ref'])
  const { overlay, snapshot, triggerElement } = usePopover('PopoverTrigger')

  function setReference(element: HTMLButtonElement) {
    triggerElement.current = element
    overlay.setReferenceElement(element)
    if (typeof local.ref === 'function') local.ref(element)
  }

  onCleanup(() => {
    triggerElement.current = null
    overlay.setReferenceElement(null)
  })

  const triggerProps = mergeProps({ type: 'button' as const, 'aria-haspopup': 'dialog' as const }, rest, {
    get 'aria-expanded'() { return snapshot().open },
    get 'data-state'() { return snapshot().open ? 'open' : 'closed' },
    onClick: (event: Parameters<JSX.EventHandler<HTMLButtonElement, MouseEvent>>[0]) => {
      callEventHandler(rest.onClick, event)
      if (!event.defaultPrevented) overlay.trigger.click(eventInfo(event))
    },
    onPointerEnter: (event: Parameters<JSX.EventHandler<HTMLButtonElement, PointerEvent>>[0]) => {
      callEventHandler(rest.onPointerEnter, event)
      if (!event.defaultPrevented) overlay.trigger.pointerEnter(eventInfo(event))
    },
    onPointerLeave: (event: Parameters<JSX.EventHandler<HTMLButtonElement, PointerEvent>>[0]) => {
      callEventHandler(rest.onPointerLeave, event)
      if (!event.defaultPrevented) overlay.trigger.pointerLeave(eventInfo(event))
    },
    onFocus: (event: Parameters<JSX.EventHandler<HTMLButtonElement, FocusEvent>>[0]) => {
      callEventHandler(rest.onFocus, event)
      if (!event.defaultPrevented) overlay.trigger.focus(eventInfo(event))
    },
    onBlur: (event: Parameters<JSX.EventHandler<HTMLButtonElement, FocusEvent>>[0]) => {
      callEventHandler(rest.onBlur, event)
      if (!event.defaultPrevented) overlay.trigger.blur(eventInfo(event))
    },
    onContextMenu: (event: Parameters<JSX.EventHandler<HTMLButtonElement, MouseEvent>>[0]) => {
      callEventHandler(rest.onContextMenu, event)
      if (!event.defaultPrevented) overlay.trigger.contextMenu(eventInfo(event))
    },
  })

  return local.children({ ref: setReference, get state() { return snapshot() }, props: triggerProps })
}
