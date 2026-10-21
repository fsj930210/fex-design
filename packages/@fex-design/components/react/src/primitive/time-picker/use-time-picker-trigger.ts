import type { HTMLAttributes, RefCallback } from 'react'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { usePopoverContext } from '../popover/popover-context'

export function useTimePickerTrigger() {
  const { overlay, triggerRef } = usePopoverContext('TimePickerTrigger')
  const snapshot = useCoreStore(overlay)
  const ref: RefCallback<HTMLElement> = useMemoizedFn((element) => {
    triggerRef.current = element
    overlay.setReferenceElement(element)
  })
  const props: HTMLAttributes<HTMLElement> & { 'data-state': 'open' | 'closed' } = {
    'aria-haspopup': 'dialog',
    'aria-expanded': snapshot.open,
    'data-state': snapshot.open ? 'open' : 'closed',
    onClick(event) {
      if (!event.defaultPrevented)
        overlay.trigger.click({
          target: event.target,
          currentTarget: event.currentTarget,
          event,
          preventDefault: () => event.preventDefault(),
          stopPropagation: () => event.stopPropagation(),
        })
    },
    onBlur(event) {
      if (!event.defaultPrevented)
        overlay.trigger.blur({
          target: event.target,
          currentTarget: event.currentTarget,
          event,
          preventDefault: () => event.preventDefault(),
          stopPropagation: () => event.stopPropagation(),
        })
    },
    onFocus(event) {
      if (!event.defaultPrevented)
        overlay.trigger.focus({
          target: event.target,
          currentTarget: event.currentTarget,
          event,
          preventDefault: () => event.preventDefault(),
          stopPropagation: () => event.stopPropagation(),
        })
    },
  }
  return { props, ref }
}
