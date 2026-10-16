import { onCleanup, type JSX } from 'solid-js'
import { usePopover } from '../popover/popover-context'

export function useTimePickerTrigger() {
  const { overlay, snapshot, triggerElement } = usePopover('TimePickerTrigger')
  const ref = (element: HTMLElement) => { triggerElement.current = element; overlay.setReferenceElement(element) }
  onCleanup(() => { triggerElement.current = null; overlay.setReferenceElement(null) })
  const props: JSX.HTMLAttributes<HTMLElement> & { readonly 'data-state': 'open' | 'closed' } = {
    'aria-haspopup': 'dialog',
    get 'data-state'() { return snapshot().open ? 'open' : 'closed' },
    get 'aria-expanded'() { return snapshot().open },
    onClick(event) { if (!event.defaultPrevented) overlay.trigger.click({ target: event.target, currentTarget: event.currentTarget, event, preventDefault: () => event.preventDefault(), stopPropagation: () => event.stopPropagation() }) },
    onBlur(event) { if (!event.defaultPrevented) overlay.trigger.blur({ target: event.target, currentTarget: event.currentTarget, event, preventDefault: () => event.preventDefault(), stopPropagation: () => event.stopPropagation() }) },
    onFocus(event) { if (!event.defaultPrevented) overlay.trigger.focus({ target: event.target, currentTarget: event.currentTarget, event, preventDefault: () => event.preventDefault(), stopPropagation: () => event.stopPropagation() }) },
  }
  return { props, ref }
}
