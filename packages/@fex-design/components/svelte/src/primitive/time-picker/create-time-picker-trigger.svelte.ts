import { getContext } from 'svelte'
import { fromStore } from 'svelte/store'
import type { HTMLAttributes } from 'svelte/elements'
import { popoverContextKey, type PopoverContext } from '../popover/popover-context'

export function createTimePickerTrigger() {
  const { overlay, snapshot, triggerElement } = getContext<PopoverContext>(popoverContextKey)
  const state = fromStore(snapshot)
  function action(element: HTMLElement) {
    triggerElement.current = element
    overlay.setReferenceElement(element)
    return {
      destroy() {
        if (triggerElement.current === element) {
          triggerElement.current = null
          overlay.setReferenceElement(null)
        }
      },
    }
  }
  function info(event: Event) {
    return {
      target: event.target,
      currentTarget: event.currentTarget,
      event,
      preventDefault: () => event.preventDefault(),
      stopPropagation: () => event.stopPropagation(),
    }
  }
  function click(event: MouseEvent) {
    if (!event.defaultPrevented) overlay.trigger.click(info(event))
  }
  function focus(event: FocusEvent) {
    if (!event.defaultPrevented) overlay.trigger.focus(info(event))
  }
  function blur(event: FocusEvent) {
    if (!event.defaultPrevented) overlay.trigger.blur(info(event))
  }
  function props(): HTMLAttributes<HTMLElement> {
    return {
      'aria-haspopup': 'dialog',
      'aria-expanded': state.current.open,
      'data-state': state.current.open ? 'open' : 'closed',
      onclick: click,
      onfocusin: focus,
      onfocusout: blur,
    }
  }
  return { action, props, click, focus, blur }
}
